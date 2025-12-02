// Types cho API Response
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  error: null;
  meta: unknown;
}

export interface ApiErrorResponse {
  success: false;
  data: null;
  error: {
    message: string;
    code: string;
    errors?: Record<string, string[]>;
  };
  meta: null;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Xử lý response từ API
 * @param response - Response object từ fetch
 * @returns Promise với dữ liệu nếu thành công
 * @throws Error với message từ backend nếu thất bại
 */
export async function handleApiResponse<T = unknown>(response: Response): Promise<T> {
  const result: ApiResponse<T> = await response.json();

  if (!result.success) {
    // Trường hợp validation error (422)
    if (result.error.code === 'VALIDATION_ERROR' && result.error.errors) {
      const errorMessages = Object.entries(result.error.errors)
        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
        .join('\n');
      throw new Error(`${result.error.message}\n${errorMessages}`);
    }

    // Trường hợp lỗi khác
    throw new Error(result.error.message || 'Có lỗi xảy ra');
  }

  return result.data;
}

/**
 * Xử lý response và hiển thị thông báo
 * @param response - Response object từ fetch
 * @param successMessage - Thông báo khi thành công
 * @returns Promise với dữ liệu nếu thành công
 */
export async function handleApiResponseWithAlert<T = unknown>(
  response: Response,
  successMessage: string = 'Thao tác thành công!'
): Promise<T> {
  try {
    const data = await handleApiResponse<T>(response);
    alert(successMessage);
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra';
    alert(errorMessage);
    throw error;
  }
}
