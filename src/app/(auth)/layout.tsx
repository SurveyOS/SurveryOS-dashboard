import Image from "next/image";
import type { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-screen-2xl m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 overflow-y-auto no-scrollbar">
          <div>
            <Image src={""} alt="Logo" className="w-mx-auto" width={120} height={120} />
          </div>
          {children}
        </div>
        <div className="flex-1 text-center hidden lg:flex bg-muted">
          <Image
            src={""}
            alt="Background"
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            width={100}
            height={10}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
