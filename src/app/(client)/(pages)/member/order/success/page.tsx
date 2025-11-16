"use client";

import {
  QueryOrderResponse,
  zaloPayService,
} from "@/lib/services/zalopay.service";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState<QueryOrderResponse | null>(
    null
  );

  const appTransId = searchParams.get("apptransid");

  // Xoá giỏ hàng checkout khi vào trang này
  useEffect(() => {
    try {
      localStorage.removeItem("checkoutCourses");
      localStorage.removeItem("checkoutCourse");
    } catch (err) {
      console.warn("Cannot access localStorage:", err);
    }
  }, []);

  // Gọi BE lấy trạng thái đơn hàng
  useEffect(() => {
    const fetchOrderStatus = async () => {
      if (!appTransId) {
        setLoading(false);
        return;
      }

      try {
        const result = await zaloPayService.getOrderStatus(appTransId);
        setOrderStatus(result);
      } catch (error) {
        console.error("Query order error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStatus();
  }, [appTransId]);

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">
            Đang xác nhận thanh toán...
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Vui lòng chờ trong giây lát
          </p>
        </div>
      </div>
    );
  }

  // Không có appTransId hoặc không có kết quả
  if (!appTransId || !orderStatus) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-2 text-red-600">
            Không tìm thấy thông tin đơn hàng
          </h1>
          <p className="text-gray-600 mb-6">
            Vui lòng kiểm tra lại đường dẫn hoặc thử vào mục đơn hàng của bạn.
          </p>
          <Link
            href="/member/order"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Xem đơn hàng
          </Link>
        </div>
      </div>
    );
  }

  // Map trạng thái theo BE: ui_status_code (ưu tiên) → return_code
  const uiCode = orderStatus.ui_status_code ?? orderStatus.return_code ?? -1;

  let statusText = "Không xác định trạng thái thanh toán.";
  let statusColor = "text-gray-700";

  if (uiCode === 1) {
    statusText = orderStatus.ui_status_message ?? "Giao dịch thành công.";
    statusColor = "text-green-600";
  } else if (uiCode === 3) {
    statusText =
      orderStatus.ui_status_message ??
      "Giao dịch đang được xử lý, vui lòng chờ thêm.";
    statusColor = "text-yellow-600";
  } else if (uiCode === 2) {
    statusText =
      orderStatus.ui_status_message ??
      orderStatus.return_message ??
      "Thanh toán thất bại.";
    statusColor = "text-red-600";
  } else {
    statusText =
      orderStatus.ui_status_message ??
      orderStatus.return_message ??
      "Không xác định trạng thái thanh toán.";
    statusColor = "text-gray-700";
  }

  const isSuccess = uiCode === 1;
  const isProcessing = uiCode === 3;
  const isFail = !isSuccess && !isProcessing;
  const isExpired = uiCode === 4;
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Status Icon + Title */}
            <div className="text-center mb-6">
              {isSuccess ? (
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-12 h-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              ) : isProcessing ? (
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-12 h-12 text-yellow-500 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M4 12a8 8 0 018-8"
                    />
                  </svg>
                </div>
              ) : (
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-12 h-12 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              )}

              <h1 className={`text-3xl font-bold mb-2 ${statusColor}`}>
                {isSuccess
                  ? "Thanh toán thành công!"
                  : isExpired
                  ? "Đơn hàng đã hết thời gian thanh toán"
                  : isProcessing
                  ? "Đang xác nhận thanh toán"
                  : "Thanh toán thất bại"}
              </h1>

              <p className="text-gray-600">{statusText}</p>
            </div>

            {/* Order Details */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <h2 className="text-xl font-semibold mb-4">
                Thông tin thanh toán
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Mã giao dịch</p>
                  <p className="font-mono text-sm">{appTransId}</p>
                </div>

                {orderStatus.zp_trans_id != "0" && (
                  <div>
                    <p className="text-sm text-gray-600">ZaloPay Trans ID</p>
                    <p className="font-mono text-sm">
                      {orderStatus.zp_trans_id}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-600">Trạng thái</p>
                  <p className={`font-semibold ${statusColor}`}>{statusText}</p>
                </div>
                {orderStatus.amount != 0 && orderStatus.amount != undefined && (
                  <div>
                    <p className="text-sm text-gray-600">Số tiền</p>
                    <p className="font-semibold">
                      {zaloPayService.formatCurrency
                        ? zaloPayService.formatCurrency(orderStatus.amount)
                        : orderStatus.amount.toLocaleString("vi-VN") + "₫"}
                    </p>
                  </div>
                )}
              </div>

              {/* {(orderStatus.ui_status_message ||
                orderStatus.sub_return_message ||
                orderStatus.return_message) && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">
                    Thông báo chi tiết:
                  </p>
                  <p className="text-sm">
                    {orderStatus.ui_status_message ||
                      orderStatus.sub_return_message ||
                      orderStatus.return_message}
                  </p>
                </div>
              )} */}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              {isSuccess ? (
                <>
                  <Link
                    href="/member/order"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-center transition-colors"
                  >
                    Xem đơn hàng
                  </Link>
                  <Link
                    href="/course"
                    className="flex-1 bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 font-semibold py-3 rounded-lg text-center transition-colors"
                  >
                    Tiếp tục mua sắm
                  </Link>
                </>
              ) : isProcessing ? (
                <>
                  <Link
                    href="/member/order"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-center transition-colors"
                  >
                    Xem đơn hàng
                  </Link>
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 font-semibold py-3 rounded-lg text-center transition-colors"
                  >
                    Làm mới trạng thái
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/member/cart"
                    className="flex-1 blue-600 hover:bg-blue-700 hover:bg-gray-50 text-gray-700 border-2 border-gray-300 font-semibold py-3 rounded-lg text-center transition-colors"
                  >
                    Quay lại giỏ hàng
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
