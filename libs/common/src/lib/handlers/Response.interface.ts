

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResponsePayload<ResponseData = any> = SuccessResponse<ResponseData> | ErrorResponse


export type SuccessResponse<ResponseData> = {
  status: 'success',
  data: ResponseData extends object ? ResponseData : undefined;
}

export type ErrorResponse  = {
  status: 'error',
  error: {
    code: string,
    message: string,
  }
}