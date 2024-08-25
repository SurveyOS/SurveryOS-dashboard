import type { ServerResponseType } from "@/api";

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignIn  {
  token: string;
  redirectUrl: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignUp {
  name: string;
  email: string;
  password: string;
  workspaces: any[];
  _id: string;
  __v: number;
}

export interface SignUpResponse extends ServerResponseType<SignUp | null> {}
export interface SignInResponse extends ServerResponseType<SignIn | null> {}
