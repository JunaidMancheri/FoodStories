

export type ResponsePayload<ResponseData = undefined> = successResponse<ResponseData> | errorResponse


export type successResponse<ResponseData> = {
  status: 'success',
  data: ResponseData extends object ? ResponseData : undefined;
}

export type errorResponse  = {
  status: 'error',
  error: {
    code: string,
    message: string,
  }
}