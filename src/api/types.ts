import type { AxiosError } from "axios";
import type { DefaultSession } from "next-auth";
export interface ServerResponseType<T> {
  success: boolean;
  message: string;
  response: T;
  statusCode: number;
}

// give axios error response data type as ServerResponseType
export type ServerErrorType = AxiosError<ServerResponseType<null>>;

declare module "next-auth" {
  interface Session {
    expires: string;
    user: {
      accessToken: string;
      companyId: string;
      workspaceId: string;
    } & DefaultSession["user"];
  }

  interface User {
    accessToken: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
