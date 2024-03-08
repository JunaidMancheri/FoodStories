

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResponsePayload<ResponseData = any> = SuccessResponse<ResponseData> | ErrorResponse


export type SuccessResponse<ResponseData = undefined> = {
  status: 'success',
  data: ResponseData;
}

export type ErrorResponse  = {
  status: 'error',
  error: {
    name: string,
    message: string,
    code: number,
  }
}
