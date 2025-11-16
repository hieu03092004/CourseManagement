"use client";
import { useRouter } from "next/navigation";
import { FaCartPlus } from "react-icons/fa";
import {
  LiaBookSolid,
  LiaClockSolid,
  LiaFileSolid,
  LiaInfinitySolid,
  LiaNewspaperSolid,
} from "react-icons/lia";
type props = { userID: string; courseID: string };

export default function CourseSideScroll({ userID, courseID }: props) {
  const router = useRouter();

  const courseData = {
    id: "COURSE001",
    name: "Lập Trình Python Từ Cơ Bản Tới Nâng Cao",
    price: 1200000,
    originalPrice: 2750000,
    lessons: 120,
    duration: "56 giờ",
    exercises: 300,
    documents: 23,
  };

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
  return (
    <div className="bg-white rounded-xl border border-[#f1f3f5] overflow-hidden p-4">
      {/* Video thumbnail */}
      <div className="relative">
        <img
          src="/demo/course-thumbnail.jpg"
          alt="Course thumbnail"
          className="w-full h-40 object-cover"
        />
        <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-600 ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      </div>

      {/* Price and CTA */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-bold text-gray-900">1,200,000VND</span>
          <span className="text-sm text-gray-400 line-through">
            2,750,000VND
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
            <span className="font-semibold text-gray-900">120</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <LiaClockSolid className="text-xl" />
              <span>Thời lượng</span>
            </div>
            <span className="font-semibold text-gray-900">56 giờ</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <LiaNewspaperSolid className="text-xl" />
              <span>Bài tập</span>
            </div>
            <span className="font-semibold text-gray-900">300</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <LiaFileSolid className="text-xl" />
              <span>Tài liệu</span>
            </div>
            <span className="font-semibold text-gray-900">23</span>
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
    </div>
  );
}
