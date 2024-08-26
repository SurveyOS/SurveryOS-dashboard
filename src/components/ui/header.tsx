"use client";

import { useMe } from "@/api/user";
import useAuth from "@/hooks/use-auth";
import useLocalStorage from "@/hooks/use-local-storage";
import useOutsideClick from "@/hooks/use-outside-click";
import { HamburgerMenuIcon, PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Combobox } from "./combo-box";
import { TabNavigation } from "./tab-navigation";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);

  const { storedValue: companyIdValue } = useLocalStorage<string>("company_id", "");
  const { storedValue: workspaceIdValue } = useLocalStorage<string>("workspace_id", "");

  // const [workspaceValue, setWorkspaceValue] = useState<string>(workspaceIdValue);

  const { isAuthenticated, onLogut } = useAuth();

  const { data: userData } = useMe({
    enabled: isAuthenticated,
  });

  // const workspace = useMemo(() => {
  //   return (
  //     userData?.response?.workspaces?.map((w) => ({
  //       label: w.workspace,
  //       value: w._id,
  //     })) || []
  //   );
  // }, [userData, companyIdValue, workspaceIdValue]);

  let body = null;

  useOutsideClick(ref, () => {
    setShowMenu(false);
  });

  const signOut = () => {
    onLogut();
  };

  const toggleLoginOptions = () => {
    setShowMenu((prev) => !prev);
  };

  const tabs = useMemo(() => {
    return [
      {
        name: "Surveys",
        coverage: `/c/${companyIdValue}/w/${workspaceIdValue}/survey`,
        href: `/c/${companyIdValue}/w/${workspaceIdValue}/survey/list`,
      },
      {
        name: "Integrations",
        coverage: `/c/${companyIdValue}/w/${workspaceIdValue}/integrations`,
        href: `/c/${companyIdValue}/w/${workspaceIdValue}/integrations`,
      },
    ];
  }, [companyIdValue, workspaceIdValue]);

  if (isAuthenticated) {
    body = (
      <div
        ref={ref}
        className="flex flex-col drop-shadow-lg space-x-2 fixed bg-white tra rounded-lg p-4 right-5 top-16"
      >
        <div className="flex flex-col space-y-3 transition-colors text-muted-foreground">
          <button className="flex items-center" onClick={() => router.push("/")} type="button">
            <p className="hover:text-primary text-sm">Organization Settings</p>
          </button>
          <button className="flex items-center" onClick={() => router.push("/")} type="button">
            <p className="hover:text-primary text-sm">Workspace Settings</p>
          </button>
          <button className="flex items-center" onClick={() => router.push("/")} type="button">
            <p className="hover:text-primary text-sm">Surverys Settings</p>
          </button>
          <button className="flex items-center" onClick={() => router.push("/")} type="button">
            <p className="hover:text-primary text-sm">Integrations</p>
          </button>
          <button className="flex items-center" onClick={() => router.push("/")} type="button">
            <p className="hover:text-primary text-sm">Invite Teammates</p>
          </button>
          <button className="flex items-center" onClick={signOut} type="button">
            <p className="hover:text-primary text-sm">Sign out</p>
          </button>
        </div>
      </div>
    );
  } else {
    body = (
      <div className="flex flex-col drop-shadow-lg space-x-2 fixed bg-white mt-4 rounded p-2 w-28 right-5">
        <div className="flex flex-col space-y-3">
          <button className="flex items-center" onClick={() => router.push("/sign-in")} type="button">
            <p className="hover:text-primary text-sm">Sign in</p>
          </button>
          <button className="flex items-center" onClick={() => router.push("/sign-up")} type="button">
            <p className="hover:text-primary text-sm">Sign up</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 grid grid-cols-2 bg-white shadow-md py-2 px-5">
      <div className="relative flex items-center h-10 cursor-pointer my-auto gap-6">
        <Image src={""} alt="Survey OS" width={100} height={50} onClick={() => router.push("/")} />

        <TabNavigation tabs={tabs} />
      </div>

      <div className="flex items-center justify-end text-muted-foreground">
        {/* {isAuthenticated && (
          <Combobox
            label={"Select workspace"}
            searchPlaceholder={"Search workspace"}
            emptyPlaceholder={"No workspace found"}
            items={workspace}
            value={workspaceValue}
            setValue={setWorkspaceValue}
          />
        )} */}
        <div>
          <button
            onClick={toggleLoginOptions}
            className={`flex items-center space-x-2 py-3 px-4 hover:bg-muted rounded-xl ${
              showMenu ? "bg-muted shadow-md" : ""
            }`}
            type="button"
          >
            <HamburgerMenuIcon width={18} height={18} />
            <PersonIcon width={18} height={18} />
          </button>
          {showMenu && body}
        </div>
      </div>
    </header>
  );
}

export default Header;
