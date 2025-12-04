"use client";
import ChapterList from "@/app/(client)/components/Chapter/ChapterList";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { use } from "react";
import { useSelector } from "react-redux";
import CoureSideScroll from "./CourseSideScroll";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import { ICourseDetail } from "@/app/(client)/interfaces/Course/ICourseDetail";
import { get } from "@/app/(admin)/ultils/request";
import { handleResponse } from "@/helpers/api/response/handleResponse";
import { IApiResponse } from "@/helpers/api/response/IResponse";
import { getCookie } from "@/app/(client)/helpers/cookie";
gsap.registerPlugin(ScrollTrigger);

interface Review {
  userName: string;
  comment: string;
  rating: number;
}

interface RootState {
  loginReducer: boolean;
}

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [courseData, setCourseData] = useState<ICourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isLogin = useSelector((state: RootState) => state.loginReducer);
  const [userId, setUserId] = useState<string>("");

  // Lấy userId từ cookie nếu đã login
  useEffect(() => {
    if (isLogin) {
      const userIdFromCookie = getCookie("id");
      if (userIdFromCookie) {
        setUserId(userIdFromCookie);
      }
    }
  }, [isLogin]);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await get(`/client/courses/detail/${id}`) as IApiResponse<ICourseDetail>;
        const { isSuccess, data, error: responseError } = handleResponse(response);

        if (isSuccess && data) {
          setCourseData(data);
        } else {
          const errorMessage = responseError?.message || "Không thể tải thông tin khóa học";
          setError(errorMessage);
          console.error("Error fetching course:", responseError);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Có lỗi xảy ra khi tải thông tin khóa học";
        setError(errorMessage);
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseData();
    }
  }, [id]);

  // Map feedback thành reviews format
  const reviews: Review[] = courseData?.feedback.map((fb) => ({
    userName: fb.fullName,
    comment: fb.comment,
    rating: fb.rating,
  })) || [];

  // Lấy videoUrl của lesson đầu tiên của topic đầu tiên có lessons
  const previewVideoUrl = courseData?.topics
    .find((topic) => topic.lessons.length > 0)?.lessons[0]?.videoUrl || undefined;

  const startRef = useRef(null);
  const endRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!courseData) return;

    gsap.set(cardRef.current, {
      autoAlpha: 1,
      pointerEvents: "auto",
    });

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const st = ScrollTrigger.create({
        trigger: startRef.current,
        start: "top top+=1px",
        endTrigger: endRef.current,
        end: "top bottom",

        onEnter: () =>
          gsap.to(cardRef.current, {
            autoAlpha: 1,
            duration: 0.2,
            pointerEvents: "auto",
          }),
        onEnterBack: () =>
          gsap.to(cardRef.current, {
            autoAlpha: 1,
            duration: 0.2,
            pointerEvents: "auto",
          }),
        onLeave: () =>
          gsap.to(cardRef.current, {
            autoAlpha: 0,
            duration: 0.2,
            pointerEvents: "none",
          }),
        onLeaveBack: () =>
          gsap.to(cardRef.current, {
            autoAlpha: 1,
            duration: 0.2,
            pointerEvents: "auto",
          }),
      });

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      return () => {
        window.removeEventListener("load", onLoad);
        st.kill();
      };
    });

    return () => mm.revert();
  }, [courseData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Đang tải thông tin khóa học...</p>
      </div>
    );
  }

  if (error || !courseData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600">Lỗi: {error || "Không thể tải thông tin khóa học"}</p>
      </div>
    );
  }

  return (
    <div className="">
      <div ref={startRef}>
        <Section1 />
      </div>

      <Section2
        rating={courseData.rating}
        title={courseData.title}
        description={courseData.description}
        reviewsCount={courseData.reviews}
        studentCount={courseData.studentCount}
      />
      <ChapterList topics={courseData.topics} />

      <div
        ref={cardRef}
        className="fixed top-24 lg:block top-24 rounded-xl shadow-2xl right-[60px] w-[360px] max-h-[600] overflow-auto"
      >
        <CoureSideScroll courseID={id} courseData={courseData} previewVideoUrl={previewVideoUrl} userId={userId} />
      </div>

      <div ref={endRef}>
        <Section3 rating={courseData.rating} reviews={reviews} />
      </div>
    </div>
  );
}
