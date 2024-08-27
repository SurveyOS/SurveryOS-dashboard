"use client";

import { useRefreshToken } from "@/api";
import { useMe } from "@/api/user";
import Header from "@/components/ui/header";
import { Spinner } from "@/components/ui/spinner";
import useAuth from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated, onRefreshToken, session } = useAuth();
  const { data: new_at } = useRefreshToken();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      if (session?.user.companyId && session.user.workspaceId) {
        router.push(`/c/${session?.user.companyId}/w/${session.user.workspaceId}/survey/list`);
      }
    } else {
      router.push("/sign-in");
    }
  }, [isAuthenticated, session, router]);

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
