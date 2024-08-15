export interface ServerResponseType<T> {
  success: boolean;
  message: string;
  response: T;
  statusCode: number;
}
