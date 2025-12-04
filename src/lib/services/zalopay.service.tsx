const API_BASE_URL = process.env.NEXT_PUBLIC_API_DOMAIN;;
export interface CreateOrderRequest {
  user_id: string;
  total_amount: number;
  course_ids: string[]; // Mảng course IDs
  bank_code?: string;
  cart_id?: string;
}

export interface CreateOrderResponse {
  success: boolean;
  order_url?: string;
  zp_trans_token?: string;
  app_trans_id?: string;
  message?: string;
  return_code?: number;
}

export interface QueryOrderResponse {
  return_code: number;
  return_message: string;
  sub_return_code?: number;
  sub_return_message?: string;
  is_processing?: boolean;
  amount?: number;
  zp_trans_id?: string;
  server_time?: number;
  discount_amount?: number;

  // --- thêm từ backend ---
  app_trans_id?: string;
  expire_duration_seconds?: number;
  created_time?: number; // unix timestamp (seconds)
  is_timeout?: boolean;
  ui_status_code?: number; // 1: success, 2: fail, 3: processing, 4: expired, -1: unknown
  ui_status_message?: string; // text thân thiện cho UI
}

class ZaloPayService {
  /**
   * Tạo order mới
   */
  async createOrder(data: CreateOrderRequest): Promise<CreateOrderResponse> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/payments/zalopay/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log(JSON.stringify(data));
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Create order error:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to create order",
      };
    }
  }

  /**
   * Query order status từ database (nhanh hơn)
   */
  async getOrderStatus(appTransId: string): Promise<QueryOrderResponse> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/payments/zalopay/order-status/${appTransId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const result = await response.json();

     
      return result as QueryOrderResponse;
    } catch (error) {
      console.error("Get order status error:", error);
      return {
        return_code: -1,
        return_message:
          error instanceof Error ? error.message : "Failed to get order status",
      };
    }
  }


  /**
   * Format currency VND
   */
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }

  //  Lấy status hiển thị UI từ kết quả query
  getUiStatus(result: QueryOrderResponse): { text: string; color: string } {
    const code = result.ui_status_code ?? result.return_code;

    // Ưu tiên logic từ backend (ui_status_code / ui_status_message)
    if (code === 1) {
      return {
        text: result.ui_status_message ?? "Thanh toán thành công",
        color: "text-green-600",
      };
    }

    if (code === 4 || result.is_timeout) {
      return {
        text:
          result.ui_status_message ??
          "Đơn hàng đã hết thời gian thanh toán (10 phút), vui lòng tạo đơn mới.",
        color: "text-orange-500",
      };
    }

    if (code === 3) {
      return {
        text:
          result.ui_status_message ??
          "Giao dịch đang được xử lý, vui lòng chờ thêm.",
        color: "text-yellow-600",
      };
    }

    if (code === 2) {
      const detail =
        result.ui_status_message ??
        result.sub_return_message ??
        result.return_message ??
        "Thanh toán thất bại.";

      return {
        text: detail,
        color: "text-red-600",
      };
    }

    // Mặc định
    return {
      text:
        result.ui_status_message ??
        result.return_message ??
        "Không xác định trạng thái thanh toán.",
      color: "text-gray-600",
    };
  }
}

export const zaloPayService = new ZaloPayService();
