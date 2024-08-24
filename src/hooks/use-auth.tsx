import { useRouter } from "next/navigation";
import { useJwt } from "react-jwt";
import useLocalStorage from "./use-local-storage";
import { useToast } from "./use-toast";

const useAuth = () => {
  const { setValue, storedValue } = useLocalStorage<string>("at", "");
  const { toast } = useToast();

  const router = useRouter();

  const { decodedToken } = useJwt(storedValue);

  let isAuthenticated = !!storedValue;
  const at = storedValue;

  const onLogin = async (token: string) => {
    try {
      setValue(token);
      toast({
        variant: "default",
        title: "Welcome back!",
      });
      isAuthenticated = true;
      router.push("/");
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
    isAuthenticated = false;
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
