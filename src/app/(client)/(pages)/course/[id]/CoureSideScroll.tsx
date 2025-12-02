"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import {
  LiaBookSolid,
  LiaClockSolid,
  LiaFileSolid,
  LiaInfinitySolid,
  LiaNewspaperSolid,
} from "react-icons/lia";
import { ICourseDataRegister } from "@/app/(client)/interfaces/ICourseDataRegister";
import DiagLogVideo from "@/app/(client)/components/Modal/DiagLogVideo";

const fetchCourseData = async (courseID: string): Promise<ICourseDataRegister> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: courseID,
    name: "Lập Trình Python Từ Cơ Bản Tới Nâng Cao",
    price: 1200000,
    originalPrice: 2750000,
    lessons: 120,
        duration: 56,
    exercises: 300,
    documents: 23,
      });
    }, 100);
  });
};

type props = {
  userID: string;
  courseID: string;
  previewVideoUrl?: string;
};

export default function CourseSideScroll({ userID, courseID, previewVideoUrl }: props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseData, setCourseData] = useState<ICourseDataRegister | null>(null);

  useEffect(() => {
    const loadCourseData = async () => {
      const data = await fetchCourseData(courseID);
      setCourseData(data);
    };
    loadCourseData();
  }, [courseID]);

  const handleEnroll = () => {
    // Lưu thông tin khóa học vào localStorage để sử dụng ở trang checkout
    localStorage.setItem("checkoutCourse", JSON.stringify(courseData));
    router.push("/member/order/checkout");
  };
  const handleAddCart = () => {
    alert("Thêm vào giỏ hàng thành công");
    console.log(userID);
    console.log(courseID);
  };

  const handlePlayPreview = () => {
    if (previewVideoUrl) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!courseData) {
    return (
      <div className="bg-white rounded-xl border border-[#f1f3f5] overflow-hidden p-4">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-40 w-full rounded"></div>
          <div className="p-6 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#f1f3f5] overflow-hidden p-4">
      {/* Video thumbnail */}
      <div className="relative">
        <Image
          src="/src/assets/images/course_default.jpg"
          alt="Course thumbnail"
          width={400}
          height={160}
          className=" w-full h-45 object-cover"
        />
        <button
          onClick={handlePlayPreview}
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <FaPlay  />
          </div>
        </button>
      </div>

      {/* Price and CTA */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-bold text-gray-900">
            {courseData.price.toLocaleString('vi-VN')}VND
          </span>
          <span className="text-sm text-gray-400 line-through">
            {courseData.originalPrice.toLocaleString('vi-VN')}VND
          </span>
        </div>

        <button
          onClick={handleAddCart}
          className="w-full bg-white text-primary border border-primary hover:bg-primary hover:text-white font-semibold py-3 rounded-lg transition-colors mb-2 flex items-center justify-center gap-1"
        >
          <span>
            <FaCartPlus />
          </span>
          Thêm giỏ hàng
        </button>
        <button
          onClick={handleEnroll}
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg transition-colors mb-6 hover:bg-white hover:text-primary outline-1 hover:outline-primary"
        >
          Đăng Ký Học
        </button>

        {/* Course info */}
        <div className="space-y-4 border-t pt-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <LiaBookSolid className="text-xl" />
              <span>Bài giảng</span>
            </div>
            <span className="font-semibold text-gray-900">{courseData.lessons}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <LiaClockSolid className="text-xl" />
              <span>Thời lượng</span>
            </div>
            <span className="font-semibold text-gray-900">{courseData.duration} giờ</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <LiaNewspaperSolid className="text-xl" />
              <span>Bài tập</span>
            </div>
            <span className="font-semibold text-gray-900">{courseData.exercises}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <LiaFileSolid className="text-xl" />
              <span>Tài liệu</span>
            </div>
            <span className="font-semibold text-gray-900">{courseData.documents}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <LiaInfinitySolid className="text-xl" />
              <span>Sở hữu</span>
            </div>
            <span className="font-semibold text-gray-900">Trọn đời</span>
          </div>
        </div>
      </div>

      <DiagLogVideo
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        videoUrl={previewVideoUrl}
        title={courseData.name}
      />
    </div>
  );
}
