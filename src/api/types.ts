import type { AxiosError } from "axios";

export interface ServerResponseType<T> {
  success: boolean;
  message: string;
  response: T;
  statusCode: number;
}

// give axios error response data type as ServerResponseType
export type ServerErrorType = AxiosError<ServerResponseType<null>>;
