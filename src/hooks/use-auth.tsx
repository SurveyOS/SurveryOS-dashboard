import type { SignInRequest } from "@/api/auth/types";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

const useAuth = () => {
  const { toast } = useToast();

  const router = useRouter();
  const { status, update, data } = useSession();
  const isAuthenticated = status === "authenticated";

  const onLogin = async (credentials: SignInRequest) => {
    if (!credentials.email || !credentials.password) return;
    try {
      const response = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: true,
        callbackUrl: "/",
      });

      if (response?.ok) {
        toast({
          variant: "default",
          title: "Welcome back!",
        });
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const onSignup = async () => {
    try {
      router.push("/sign-in");
      toast({
        variant: "default",
        title: "Account created!",
        description: "You can now login with your new account.",
      });
    } catch (error: any) {
      console.error(error);
    }
  };

  const onLogut = async () => {
    await signOut({
      callbackUrl: "/sign-in",
      redirect: true,
    });
  };

  const onRefreshToken = async (token: string) => {
    try {
      update({
        accessToken: token,
      });
    } catch (error: any) {
      console.error(error);
    }
  };

  return {
    session: data,
    isAuthenticated,
    onLogin,
    onSignup,
    onLogut,
    onRefreshToken,
    status,
  };
};

export default useAuth;
