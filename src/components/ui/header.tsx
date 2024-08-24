"use client";

import useAuth from "@/hooks/use-auth";
import useOutsideClick from "@/hooks/use-outside-click";
import { HamburgerMenuIcon, PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);

  const { isAuthenticated, onLogut } = useAuth();
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

  if (isAuthenticated) {
    body = (
      <div ref={ref} className="flex flex-col drop-shadow-lg space-x-2 fixed bg-white rounded-lg p-4 right-2 top-16">
        <div className="flex flex-col space-y-3 text-gray-600">
          <button className="flex items-center" onClick={() => router.push("/dashboard")} type="button">
            <p className="text-base">Organization Settings</p>
          </button>
          <button className="flex items-center" onClick={() => router.push("/dashboard")} type="button">
            <p className="text-base">Workspace Settings</p>
          </button>
          <button className="flex items-center" onClick={() => router.push("/dashboard")} type="button">
            <p className="text-base">Surverys Settings</p>
          </button>
          <button className="flex items-center" onClick={() => router.push("/dashboard")} type="button">
            <p className="text-base">Integrations</p>
          </button>
          <button className="flex items-center" onClick={() => router.push("/dashboard")} type="button">
            <p className="text-base">Invite Teammates</p>
          </button>
          <button className="flex items-center" onClick={signOut} type="button">
            <p className="text-base">Sign out</p>
          </button>
        </div>
      </div>
    );
  } else {
    body = (
      <div className="flex flex-col drop-shadow-lg space-x-2 fixed bg-white mt-4 rounded p-2 w-28 right-2">
        <div className="flex flex-col space-y-3">
          <button className="flex items-center" onClick={() => router.push("/sign-in")} type="button">
            <p className="text-base">Sign in</p>
          </button>
          <button className="flex items-center" onClick={() => router.push("/sign-up")} type="button">
            <p className="text-base">Sign up</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 grid grid-cols-2 bg-white shadow-md py-2 px-5">
      <div className="relative flex items-center h-10 cursor-pointer my-auto gap-6">
        <Image src={""} alt="Survey OS" width={100} height={50} onClick={() => router.push("/")} />

        <div className="flex items-center text-gray-600 bg-neutral-100 shadow-sm rounded-md p-2">
          <p className="text-base font-medium">Survey</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 justify-end text-gray-600">
        <div>
          <button
            onClick={toggleLoginOptions}
            className={`flex items-center space-x-2 py-3 px-4 hover:bg-neutral-50 rounded-xl ${
              showMenu ? "bg-neutral-50 shadow-md" : ""
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
