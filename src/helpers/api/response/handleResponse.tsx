import { IApiError, IApiResponse } from "./IResponse";

export const handleResponse = <T = unknown>(response: IApiResponse<T>): {
  isSuccess: boolean;
  data: T | null;
  error: IApiError | null;
} => {
  return {
    isSuccess: response.success,
    data: response.data,
    error: response.error,
  };
};

export const handleApiSuccess = <T = unknown>(response: IApiResponse<T>): T => {
  if (!response.success || !response.data) {
    throw new Error(response.error?.message || 'Request failed');
  }
  return response.data;
};

export const handleApiError = (response: IApiResponse): string => {
  if (response.error) {
    return response.error.message || 'Có lỗi xảy ra';
  }
  return 'Có lỗi xảy ra';
};

export const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object' && 'error' in error) {
    const apiError = error as { error?: IApiError };
    return apiError.error?.message || 'Có lỗi xảy ra';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Có lỗi xảy ra';
};

