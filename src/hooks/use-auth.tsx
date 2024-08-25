import type { ServerResponseType } from "@/api";
import type { SignIn } from "@/api/auth/types";
import { useRouter } from "next/navigation";
import { useJwt } from "react-jwt";
import useLocalStorage from "./use-local-storage";
import { useToast } from "./use-toast";

const useAuth = () => {
  const { setValue, storedValue } = useLocalStorage<string>("at", "");
  const { setValue: setCompanyIdValue } = useLocalStorage<string>("company_id", "");
  const { setValue: setWorkspaceIdValue } = useLocalStorage<string>("workspace_id", "");
  const { toast } = useToast();

  const router = useRouter();

  const { decodedToken } = useJwt(storedValue);

  let isAuthenticated = !!storedValue;
  const at = storedValue;

  const onLogin = async (object: ServerResponseType<SignIn | null>) => {
    if (!object.response) return;
    try {
      setValue(object.response?.token);
      toast({
        variant: "default",
        title: "Welcome back!",
      });

      const companyId = object.response?.redirectUrl.split("/")[2];
      const workspaceId = object.response?.redirectUrl.split("/")[4];

      setCompanyIdValue(companyId);
      setWorkspaceIdValue(workspaceId);

      isAuthenticated = true;

      router.push(object.response?.redirectUrl);
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

  const onLogut = () => {
    localStorage.removeItem("at");
    localStorage.removeItem("company_id");
    localStorage.removeItem("workspace_id");

    isAuthenticated = false;
    router.push("/sign-in");
  };

  const onRefreshToken = async (token: string) => {
    try {
      setValue(token);
    } catch (error: any) {
      console.error(error);
    }
  };

  return {
    isAuthenticated,
    onLogin,
    onSignup,
    onLogut,
    onRefreshToken,
    at,
    decodedToken,
  };
};

export default useAuth;
