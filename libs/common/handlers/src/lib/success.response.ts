import { SuccessResponse } from "./Response.interface";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function respondSuccess<T>(data: T): SuccessResponse<T> {
  return {
    status:  'success',
    data,
  }
}