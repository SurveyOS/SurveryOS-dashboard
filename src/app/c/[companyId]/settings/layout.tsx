"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import type { FC, ReactNode } from "react";

interface SettingsLayoutProps {
  children: ReactNode;
}

const SettingsLayout: FC<SettingsLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentTab = pathname?.split("/").pop() || "general";
  const companyId = pathname?.split("/")[2];

  const handleTabChange = (value: string) => {
    router.push(`/c/${companyId}/settings/${value}`);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Company Settings</h1>
      <Tabs defaultValue="general" onValueChange={handleTabChange} value={currentTab}>
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="teammates">Teammates</TabsTrigger>
          <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
        </TabsList>
        <TabsContent value={currentTab}>
          <div className="py-4">{children}</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsLayout;
