"use client";
import ChapterList from "@/app/(client)/components/Chapter/ChapterList";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import CoureSideScroll from "./CoureSideScroll";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
gsap.registerPlugin(ScrollTrigger);

interface Review {
  userName: string;
  comment: string;
  rating: number;
}

interface Lesson {
  title: string;
  videoUrl: string;
  duration: number;
  orderIndex: number;
}

interface Topic {
  title: string;
  orderIndex: number;
  lessons: Lesson[];
}

interface CourseData {
  id: string;
  title: string;
  description: string;
  rating: number;
  studentCount: number;
  reviews: Review[];
  topics: Topic[];
}

const fetchCourseData = () => {
  let data: CourseData = {
    id: "1",
    title:
      "Học Lập Trình C qua 170 bài giảng, 350 bài tập thực hành và 200 câu trắc nghiệm (Update 2025)",
    description:
      "Khóa học lập trình C của 28Tech cung cấp trọng vẹn kiến thức lý thuyết và bài tập về ngôn ngữ lập trình C. Học viên được thực hành với 320 bài tập lập trình từ cơ bản tới nâng cao và 200 bài tập trắc nghiệm củng cố lý thuyết. Học viên sẽ làm bài và chấm bài tự động với website Hackerrank, các bài tập đều có lời giải chi tiết và học viên sẽ được hỗ trợ giải đáp khi gặp khó khăn.",
    rating: 4,
    studentCount: 2157,
    reviews: [
      {
        userName: "Nguyễn Văn A",
        comment: "Khoá học chất lượng, cám ơn team 28tech!!",
        rating: 5,
      },
      {
        userName: "Nguyễn Văn A",
        comment: "Khoá học chất lượng, cám ơn team 28tech!!",
        rating: 5,
      },
      {
        userName: "Nguyễn Văn A",
        comment: "Khoá học chất lượng, cám ơn team 28tech!!",
        rating: 5,
      },
      {
        userName: "Nguyễn Văn A",
        comment: "Khoá học chất lượng, cám ơn team 28tech!!",
        rating: 4,
      },
    ],
    topics: [
      {
        title: "Phần 1:Kiểu dữ liệu, biến, vòng lặp, hàm",
        orderIndex: 1,
        lessons: [
          {
            title: "Lập trình C",
            videoUrl: "/src/assets/videos/1762481529575_487qkl.mp4",
            duration: 10,
            orderIndex: 1,
          },
          {
            title: "Lập trình C",
            videoUrl: "/src/assets/videos/1762481529575_487qkl.mp4",
            duration: 10,
            orderIndex: 1,
          },
          {
            title: "Lập trình C",
            videoUrl: "/src/assets/videos/1762481529575_487qkl.mp4",
            duration: 10,
            orderIndex: 1,
          },
          {
            title: "Lập trình C",
            videoUrl: "/src/assets/videos/1762481529575_487qkl.mp4",
            duration: 10,
            orderIndex: 1,
          },
          {
            title: "Lập trình C",
            videoUrl: "/src/assets/videos/1762481529575_487qkl.mp4",
            duration: 10,
            orderIndex: 1,
          },
        ],
      },
      {
        title: "Phần 2:Kiểu dữ liệu, biến, vòng lặp, hàm",
        orderIndex: 2,
        lessons: [
          {
            title: "Bài 1. Hướng dẫn cài đặt phần mềm DEV C++ để lập trình",
            videoUrl: "/src/assets/videos/1762481652483_13ndh.mp4",
            duration: 600,
            orderIndex: 1,
          },
          {
            title: "Bài 1. Hướng dẫn cài đặt phần mềm DEV C++ để lập trình",
            videoUrl: "/src/assets/videos/1762481652483_13ndh.mp4",
            duration: 600,
            orderIndex: 1,
          },
          {
            title: "Bài 1. Hướng dẫn cài đặt phần mềm DEV C++ để lập trình",
            videoUrl: "/src/assets/videos/1762481652483_13ndh.mp4",
            duration: 600,
            orderIndex: 1,
          },
          {
            title: "Bài 1. Hướng dẫn cài đặt phần mềm DEV C++ để lập trình",
            videoUrl: "/src/assets/videos/1762481652483_13ndh.mp4",
            duration: 600,
            orderIndex: 1,
          },
          {
            title: "Bài 1. Hướng dẫn cài đặt phần mềm DEV C++ để lập trình",
            videoUrl: "/src/assets/videos/1762481652483_13ndh.mp4",
            duration: 600,
            orderIndex: 1,
          },
          {
            title: "Bài 1. Hướng dẫn cài đặt phần mềm DEV C++ để lập trình",
            videoUrl: "/src/assets/videos/1762481652483_13ndh.mp4",
            duration: 600,
            orderIndex: 1,
          },
        ],
      },
    ],
  };
  return data;
};

export default function CourseDetailPage() {
  const courseData = fetchCourseData();

  const startRef = useRef(null); // nơi bắt đầu cho card xuất hiện (Section1 hoặc Section2/ChapterList)
  const endRef = useRef(null); // Section3 (điểm dừng)
  const cardRef = useRef(null);

  useEffect(() => {
    // Ẩn card ban đầu
    gsap.set(cardRef.current, {
      autoAlpha: 1,
      pointerEvents: "auto",
    });

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const st = ScrollTrigger.create({
        trigger: startRef.current, // bắt đầu theo Section1 (tuỳ bạn đổi)
        start: "top top+=1px", // chừa header ~96px
        endTrigger: endRef.current, // dừng trước Section3
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
            pointerEvents: "none",
          }),
      });

      // refresh khi resize/ảnh load
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      return () => {
        window.removeEventListener("load", onLoad);
        st.kill();
      };
    });

    return () => mm.revert();
  }, []);
  return (
    <div className="">
      {/* Điểm start: cho ref đúng phần bạn muốn */}
      <div ref={startRef}>
        <Section1 />
      </div>

      <Section2
        rating={courseData.rating}
        title={courseData.title}
        description={courseData.description}
        reviewsCount={courseData.reviews.length}
        studentCount={courseData.studentCount}
      />
      <ChapterList topics={courseData.topics} />

      {/* CARD nổi góc phải — đè lên nội dung */}
      <div
        ref={cardRef}
        className="fixed top-24 lg:block
         top-24 rounded-xl shadow-2xl right-[60px] w-[360px] max-h-[600] overflow-auto"
      >
        <CoureSideScroll userID={"1"} courseID={courseData.id} />
      </div>

      {/* Section3: endTrigger */}
      <div ref={endRef}>
        <Section3 rating={courseData.rating} reviews={courseData.reviews} />
      </div>
    </div>
  );
}
