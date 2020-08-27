export interface IResponse<T> {
  success: boolean;
  data?: T;
  code?: string;
  message?: string;
}

export function getSuccessResponse<T>(data: T): IResponse<T> {
  return { success: true, data }
}

export function getErrorResponse<T>(code?: string, message?: string): IResponse<T> {
  return { success: false, code, message };
} 