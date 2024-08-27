import type { AxiosResponse } from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { SignInResponse } from "../../../api/auth/types";
import { client } from "../../../api/common";

export default NextAuth({
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        return (await client())
          .post("/users/login", credentials)
          .then((response: AxiosResponse<SignInResponse>) => {
            if (response.data) {
              return {
                accessToken: response.data.response?.token as string,
                companyId: response.data.response?.companyId as string,
                workspaceId: response.data.response?.workspaceId as string,
              };
            }
          })
          .catch((error) => {
            throw new Error(error.response.data.message);
          });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
});
