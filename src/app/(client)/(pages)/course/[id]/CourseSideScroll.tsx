"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import {
  LiaBookSolid,
  LiaClockSolid,
  LiaFileSolid,
  LiaInfinitySolid,
  LiaNewspaperSolid,
} from "react-icons/lia";
import { ICourseDetail } from "@/app/(client)/interfaces/Course/ICourseDetail";
import DiagLogVideo from "@/app/(client)/components/Modal/DiagLogVideo";

type props = {
  courseID: string;
  courseData: ICourseDetail;
  previewVideoUrl?: string;
  userId: string;
};
export default function CourseSideScroll({ courseID, courseData, previewVideoUrl, userId }: props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Tính toán các giá trị từ courseData
  const totalLessons = courseData.topics.reduce((sum, topic) => sum + topic.lessons.length, 0);
  const originalPrice = courseData.price *(1 - courseData.discountPercent / 100);
  const handleEnroll = () => {
    const checkoutData = {
      id: courseID,
      name: courseData.title,
      price: courseData.price,
      originalPrice: originalPrice,
      image: courseData.image,
      lessons: totalLessons,
      duration: courseData.duration,
      exercises: 0,
      documents: 0,
    };
    localStorage.setItem("checkoutCourse", JSON.stringify(checkoutData));
    router.push("/member/order/checkout");
  };

  const handleAddCart = () => {
    alert("Thêm vào giỏ hàng thành công");
    console.log(userId);
    console.log(courseID);
  };

  const handlePlayPreview = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl border border-[#f1f3f5] overflow-hidden p-4">
      {/* Video thumbnail */}
      <div className="relative">
        <Image
          src={courseData.image || "/src/assets/images/course_default.jpg"}
          alt="Course thumbnail"
          width={400}
          height={160}
          className="w-full h-45 object-cover"
        />
        <button
          onClick={handlePlayPreview}
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <FaPlay />
          </div>
        </button>
      </div>

      {/* Price and CTA */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-bold text-gray-900">
          {Math.round(originalPrice).toLocaleString('vi-VN')}VND
          </span>
          <span className="text-sm text-gray-400 line-through">
            {courseData.price.toLocaleString('vi-VN')}VND
          </span>
        </div>

        <button
          onClick={handleAddCart}
          className="w-full bg-white text-primary border border-primary hover:bg-primary hover:text-white font-semibold py-3 rounded-lg transition-colors mb-2 flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>
            <FaCartPlus />
          </span>
          Thêm giỏ hàng
        </button>
        <button
          onClick={handleEnroll}
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg transition-colors mb-6 hover:bg-white hover:text-primary outline-1 hover:outline-primary cursor-pointer"
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
            <span className="font-semibold text-gray-900">{totalLessons}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <LiaClockSolid className="text-xl" />
              <span>Thời lượng</span>
            </div>
            <span className="font-semibold text-gray-900">{courseData.duration} ngày</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <LiaNewspaperSolid className="text-xl" />
              <span>Bài tập</span>
            </div>
            <span className="font-semibold text-gray-900">0</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <LiaFileSolid className="text-xl" />
              <span>Tài liệu</span>
            </div>
            <span className="font-semibold text-gray-900">0</span>
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
        title={courseData.title}
      />
    </div>
  );
}
