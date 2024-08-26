"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "./scroll-area";

interface TabNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: { name: string; href: string; coverage: string }[];
}

export function TabNavigation({ className, tabs, ...props }: TabNavigationProps) {
  const pathname = usePathname();

  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("flex items-center", className)} {...props}>
          {tabs.map((tab, index) => (
            <Link
              href={tab.href}
              key={tab.href}
              className={cn(
                "flex h-8 items-center justify-center rounded-lg px-4 text-center text-sm transition-colors hover:text-primary",
                pathname?.startsWith(tab.coverage) || (index === 0 && pathname === "/")
                  ? "bg-muted font-medium text-primary"
                  : "text-muted-foreground",
              )}
            >
              {tab.name}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}
