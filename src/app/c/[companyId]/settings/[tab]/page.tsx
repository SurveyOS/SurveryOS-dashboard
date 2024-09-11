"use client";

import GeneralSettings from "@/components/settings/general";
import TeammatesSettings from "@/components/settings/teammates";
import WorkspacesSettings from "@/components/settings/workspace";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const pathname = usePathname();
  const [tab, setTab] = useState<string | undefined>(pathname?.split("/").pop());

  useEffect(() => {
    setTab(pathname?.split("/").pop());
  }, [pathname]);

  const renderTabContent = () => {
    switch (tab) {
      case "general":
        return <GeneralSettings />;
      case "teammates":
        return <TeammatesSettings />;
      case "workspaces":
        return <WorkspacesSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return renderTabContent();
};

export default page;
