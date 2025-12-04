"use client";
import { zaloPayService } from "@/lib/services/zalopay.service";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getCookie } from "../../../../helpers/cookie";


const paymentMethods = {
  id: "atm",
  name: "Thẻ ATM",
  description: "Thanh toán bằng thẻ ATM nội địa",
  icon: "🏦",
  bankCode: "",
};

interface Course {
  id: string;
  title: string;
  price: number;
  image?: string;
  originalPrice?: number;
  lessons?: number;
  duration?: string;
  exercises?: number;
  documents?: number;
}

interface RootState {
  loginReducer: boolean;
}

export default function OrderCheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const isLogin = useSelector((state: RootState) => state.loginReducer);

  const [customerInfo, setCustomerInfo] = useState({
    id: "1",
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    // Load courses từ localStorage (từ cart hoặc từ course detail)
    const savedCourses = localStorage.getItem("checkoutCourses");
    const savedCourse = localStorage.getItem("checkoutCourse");
    if (savedCourses) {
      // Từ cart - nhiều khóa học
      const coursesData = JSON.parse(savedCourses);
      setCourses(coursesData);
    } else if (savedCourse) {
      // Từ course detail - một khóa học
      const courseData = JSON.parse(savedCourse);
      setCourses([
        {
          id: courseData.id,
          title: courseData.name,
          price: courseData.price,
          originalPrice: courseData.originalPrice,
          image: courseData.image,
          lessons: courseData.lessons,
          duration: courseData.duration,
          exercises: courseData.exercises,
          documents: courseData.documents,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    // Load thông tin khách hàng từ cookie nếu đã đăng nhập
    if (isLogin) {
      const userId = getCookie("id");
      const fullName = getCookie("fullName");
      const email = getCookie("email");
      const phone = getCookie("phone") || "0123456789";

      setCustomerInfo({
        id: userId || "1",
        name: fullName || "",
        email: email || "",
        phone: phone,
      });
    }
  }, [isLogin]);

  // Tính tổng giá sau giảm (price) và tổng giá gốc (originalPrice)
  console.log("courses", courses);
  const totalAmount = courses.reduce((sum, course) => sum + course.price, 0);
  const totalOriginalPrice = courses.reduce(
    (sum, course) => sum + (course.originalPrice || course.price),
    0
  );
  console.log("totalAmount", totalAmount);
  console.log("totalOriginalPrice", totalOriginalPrice);

  // Với 1 item: tạm tính và tổng cộng = originalPrice
  // Với nhiều items: tạm tính = totalOriginalPrice, tổng cộng = totalAmount


  const handlePayment = async () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      setError("Vui lòng điền đầy đủ thông tin khách hàng");
      return;
    }

    if (courses.length === 0) {
      setError("Không có khóa học nào để thanh toán");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Chỉ gửi user_id, total_amount và mảng course_ids
      const courseIds = courses.map((c) => c.id);
      console.log("courses", courses);
      const cartId = getCookie("cartId") || "";

      const result = await zaloPayService.createOrder({
        user_id: customerInfo.id,
        total_amount: totalOriginalPrice,
        course_ids: courseIds,
        bank_code: paymentMethods.bankCode || "",
        cart_id: cartId,
      });

      console.log("result create order:", result);

      if (result.success && result.order_url) {
        // Đánh dấu là đang chuyển đến trang thanh toán
        sessionStorage.setItem("navigatingToPayment", "true");

        // Redirect to ZaloPay payment page
        window.location.href = result.order_url;
        console.log("Kết quả nè:", result);
      } else {
        console.log("Kết quả nè:", result);
        setError(result.message || "Không thể tạo đơn hàng");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Thanh toán đơn hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Thông tin đơn hàng{" "}
                <span className="text-blue-600 text-sm">
                  ({courses.length} khóa học)
                </span>
              </h2>

              {/* Danh sách khóa học */}
              <div className="space-y-4 mb-6">
                {courses.map((course, index) => (
                  <div
                    key={course.id}
                    className={`flex gap-4 pb-4 ${
                      index < courses.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {course.image ? (
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-blue-600">
                          {(course.originalPrice || course.price).toLocaleString("vi-VN")}₫
                        </span>
                        {course.originalPrice && course.originalPrice !== course.price && (
                            <span className="text-gray-400 line-through text-sm">
                              {course.price.toLocaleString("vi-VN")}₫
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tổng kết */}
              <div className="mt-6 space-y-3 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tạm tính</span>
                  <span className="font-semibold">
                    {totalAmount.toLocaleString("vi-VN")}₫
                  </span>
                </div>
                {/* Chỉ hiển thị giảm giá khi có nhiều items và totalOriginalPrice < totalAmount */}
                { totalOriginalPrice < totalAmount && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Giảm giá</span>
                    <span className="text-green-600 font-semibold">
                      -
                      {(totalAmount - totalOriginalPrice).toLocaleString(
                        "vi-VN"
                      )}
                      ₫
                    </span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold text-lg">Tổng cộng</span>
                  <span className="font-bold text-2xl text-blue-600">
                    {totalOriginalPrice.toLocaleString("vi-VN")}₫
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Thông tin khách hàng
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập họ tên"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="example@email.com"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0123456789"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">
                Phương thức thanh toán
              </h2>

              <div className="space-y-3 mb-6">
                <div
                  key={paymentMethods.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all border-blue-600 bg-blue-50`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id={paymentMethods.id}
                      name="payment"
                      defaultChecked
                      className="w-5 h-5 text-blue-600"
                    />
                    <label
                      htmlFor={paymentMethods.id}
                      className="flex-1 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{paymentMethods.icon}</span>
                        <div>
                          <div className="font-semibold">
                            {paymentMethods.name}
                          </div>
                          <div className="text-xs text-gray-600">
                            {paymentMethods.description}
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <button
                onClick={handlePayment}
                disabled={loading || courses.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2  "
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Đang xử lý...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 4H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2zm-1 13H4V7h16v10z" />
                      <path d="M6 9h4v2H6zm0 3h8v2H6z" />
                    </svg>
                    <span>Thanh toán ngay</span>
                  </>
                )}
              </button>
              <Link
                href={"/cart"}
                className="text-blue-600 hover:text-blue-700 mt-3 flex gap-2 items-center justify-center "
              >
                <span>
                  <FaArrowLeft />
                </span>
                Quay lại giỏ hàng{" "}
              </Link>

              {/* Test mode info */}
              {/* <div className="mt-4 bg-yellow-50 border border-yellow-200 px-4 py-3 rounded-lg text-xs text-yellow-800">
                <p className="font-semibold mb-1">🧪 Chế độ test (Sandbox)</p>
                <p>Thẻ test: 4111111111111111 | CVV: 123 | OTP: 123456</p>
              </div>

              <div className="mt-6 pt-6 border-t text-sm text-gray-600">
                <p className="mb-2">🔒 Giao dịch được bảo mật</p>
                <p>Thông tin thanh toán của bạn được mã hóa an toàn</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
