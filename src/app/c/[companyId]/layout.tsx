import Header from "@/components/ui/header";
import type { FC, ReactNode } from "react";

interface PanelLayoutProps {
  children: ReactNode;
}

const PanelLayout: FC<PanelLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="p-4">{children}</div>
    </div>
  );
};

export default PanelLayout;
