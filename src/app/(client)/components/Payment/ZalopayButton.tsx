"use client";
import { zaloPayService } from "@/lib/services/zalopay.service";
import { useState } from "react";

interface ZaloPayButtonProps {
  amount: number;
  description?: string;
  userId?: string;
  courseId?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function ZaloPayButton({
  amount,
  description = "Thanh toán khóa học",
  userId,
  courseId,
  onSuccess,
  onError,
}: ZaloPayButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await zaloPayService.createOrder({
        amount,
        description,
        user_id: userId,
        course_id: courseId,
      });

      if (result.success && result.order_url) {
        // Redirect to ZaloPay payment page
        window.location.href = result.order_url;
        onSuccess?.();
      } else {
        const errorMessage = result.message || "Không thể tạo đơn hàng";
        setError(errorMessage);
        onError?.(errorMessage);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Đã xảy ra lỗi";
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
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
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 4H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2zm-1 13H4V7h16v10z" />
              <path d="M6 9h4v2H6zm0 3h8v2H6z" />
            </svg>
            <span>Thanh toán ZaloPay</span>
          </>
        )}
      </button>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          <p className="font-semibold">Lỗi:</p>
          <p>{error}</p>
        </div>
      )}

      {/* Test mode info */}
      <div className="bg-yellow-50 border border-yellow-200 px-4 py-3 rounded-lg text-xs text-yellow-800">
        <p className="font-semibold mb-1">🧪 Chế độ test (Sandbox)</p>
        <p>Sử dụng thẻ test: 4111111111111111 | CVV: 123 | OTP: 123456</p>
      </div>
    </div>
  );
}
