import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type React from "react";
import { Label } from "@/components/ui/label";
import ChangeCompanyName from "./modal/change-company-name";

const GeneralSettings: React.FC = () => {
  return (
    <Card className="p-12 grid grid-cols-2 gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name" className="font-semibold text-md">
          Company name
        </Label>
        <span className="font-normal text-sm">Pedro Duarte</span>
        <ChangeCompanyName />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="privacy and security" className="font-semibold text-md">
          Privacy and security
        </Label>
        <Button variant="link" className="justify-start" size={"link"}>
          <span className="font-normal">Terms of service</span>
        </Button>
        <Button variant="link" className="justify-start" size={"link"}>
          <span className="font-normal">Content policy</span>
        </Button>
        <Button variant="link" className="justify-start" size={"link"}>
          <span className="font-normal">Privacy policy</span>
        </Button>
        <Button variant="link" className="justify-start" size={"link"}>
          <span className="font-normal">GDPR compliance</span>
        </Button>
        <Button variant="link" className="justify-start" size={"link"}>
          <span className="font-normal">Data processing agreement</span>
        </Button>
      </div>
    </Card>
  );
};

export default GeneralSettings;
