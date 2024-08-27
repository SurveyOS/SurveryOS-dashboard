import SignInForm from "@/components/form/sign-in-form";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <div className="w-full">
        <SignInForm />
      </div>
    </Suspense>
  );
};

export default page;
