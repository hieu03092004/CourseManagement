"use client";
import { useState } from "react";

interface Course {
  id: string;
  title: string;
  price: number;
  image: string;
}

const fetchCartData = (): Course[] => {
  return [
    {
      id: "1",
      title:
        "Lập Trình Python Từ Cơ Bản Tới Nâng Cao Qua 120 Video Và 300 Bài Tập Thực Hành (Update 2025)",
      price: 1200000,
      image: "/src/assets/images/course_img_demo.png",
    },
    {
      id: "2",
      title:
        "Lập Trình Python Từ Cơ Bản Tới Nâng Cao Qua 120 Video Và 300 Bài Tập Thực Hành (Update 2025)",
      price: 1200000,
      image: "/src/assets/images/course_img_demo.png",
    },
    {
      id: "3",
      title:
        "Lập Trình Python Từ Cơ Bản Tới Nâng Cao Qua 120 Video Và 300 Bài Tập Thực Hành (Update 2025)",
      price: 1200000,
      image: "/src/assets/images/course_img_demo.png",
    },
    {
      id: "4",
      title:
        "Lập Trình Python Từ Cơ Bản Tới Nâng Cao Qua 120 Video Và 300 Bài Tập Thực Hành (Update 2025)",
      price: 1200000,
      image: "/src/assets/images/course_img_demo.png",
    },
  ];
};
export default function CartPage() {
  localStorage.removeItem("checkoutCourses");
  localStorage.removeItem("checkoutCourse");

  const cartData = fetchCartData();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const toggleCourse = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const total = cartData
    .filter((c) => selectedCourses.includes(c.id))
    .reduce((s, c) => s + c.price, 0);

  const handleCheckout = () => {
    const selectedItems = cartData.filter((c) =>
      selectedCourses.includes(c.id)
    );
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một khóa học");
      return;
    }
    localStorage.setItem("checkoutCourses", JSON.stringify(selectedItems));
    window.location.href = "/member/order/checkout";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <a href="/" className="text-gray-600 hover:text-blue-600">
            Trang chủ
          </a>
          <span className="text-gray-400">•</span>
          <span className="text-blue-600 font-medium">Đơn hàng</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-8">
          Thông tin khóa học{" "}
          <span className="text-blue-500">({cartData.length} Khóa học)</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Cart list */}
          <div className="lg:col-span-2">
            <div className="bg-blue-50 rounded-lg p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-blue-600 font-medium text-lg">
                  Khóa học
                </div>
                <div className="flex items-center gap-16">
                  <div className="text-blue-600 font-medium">Giá</div>
                  <div className="text-blue-600 font-medium">Xóa</div>
                </div>
              </div>

              {/* Course list */}
              <div className="space-y-4">
                {cartData.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center gap-4 bg-white p-4 rounded-lg"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => toggleCourse(course.id)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer flex-shrink-0"
                    />

                    <div className="w-20 h-20 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                      <img
                        src={course.image}
                        alt="Course thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-normal text-gray-800 line-clamp-2">
                        {course.title}
                      </h3>
                    </div>

                    <div className="text-right flex-shrink-0 w-32">
                      <div className="text-lg font-semibold text-gray-800">
                        {course.price.toLocaleString("vi-VN")}
                      </div>
                      <div className="text-sm text-gray-500">VND</div>
                    </div>

                    <button className="text-gray-600 hover:text-red-600 transition-colors flex-shrink-0 w-8 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div className="text-gray-700 font-medium">Tổng tiền</div>
                <div className="text-xl font-bold text-gray-800">
                  {total.toLocaleString("vi-VN")} VND
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={selectedCourses.length === 0}
                className="w-full bg-cyan-400 hover:bg-cyan-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Xác nhận giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
