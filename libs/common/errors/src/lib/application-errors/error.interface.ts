export interface IError {
  statusCode: number;
  name: string;
  message: string;
  details?: string;
}