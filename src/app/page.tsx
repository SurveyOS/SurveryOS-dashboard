"use client";

import { useRefreshToken } from "@/api";
import Header from "@/components/ui/header";
import { Spinner } from "@/components/ui/spinner";
import useAuth from "@/hooks/use-auth";
import useLocalStorage from "@/hooks/use-local-storage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { storedValue: companyIdValue } = useLocalStorage<string | null>("company_id", null);
  const { storedValue: workspaceIdValue } = useLocalStorage<string | null>("workspace_id", null);
  const { isAuthenticated, onRefreshToken } = useAuth();
  const { data: new_at } = useRefreshToken();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && companyIdValue && workspaceIdValue) {
      router.push(`/c/${companyIdValue}/w/${workspaceIdValue}/survey/list`);
    } else {
      router.push("/sign-in");
    }
  }, [isAuthenticated, companyIdValue, workspaceIdValue, router]);

  useEffect(() => {
    if (new_at) {
      onRefreshToken(new_at);
    }
  }, [new_at, onRefreshToken]);

  return (
    <div>
      <Header />
      <div className="p-4 flex justify-center items-center h-screen">
        <Spinner />
      </div>
    </div>
  );
}
