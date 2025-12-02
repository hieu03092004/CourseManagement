export interface IApiError {
  message: string;
  code?: string | null;
  errors?: Record<string, unknown> | null;
}

export interface IApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  error: IApiError | null;
  meta?: unknown;
}

