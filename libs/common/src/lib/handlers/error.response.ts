import { ErrorResponse } from "./Response.interface";

export function respondError(code: string, message: string): ErrorResponse {
  return {
    status: 'error',
    error: {
      code,
      message,
    }
  }
}