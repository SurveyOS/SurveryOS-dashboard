import { useJwt } from "react-jwt";
import { useToast } from "./useToast";
import { useRouter } from "next/navigation";
import useLocalStorage from "./useLocalStorage";

const useAuth = () => {
  const { setValue, storedValue } = useLocalStorage<string>("at", "");
  const { toast } = useToast();

  const router = useRouter();

  const { decodedToken } = useJwt(storedValue);

  const isAuthenticated = !!storedValue;
  const at = storedValue;

  const onLogin = async (token: string) => {
    try {
      setValue(token);
      toast({
        variant: "default",
        title: "Welcome back!",
      });
      router.push("/");
    } catch (error: any) {
      throw error;
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
      throw error;
    }
  };
  const onLogut = () => {
    localStorage.removeItem("at");
    router.push("/sign-in");
  };

  return {
    isAuthenticated,
    onLogin,
    onSignup,
    onLogut,
    at,
    decodedToken,
  };
};

export default useAuth;
