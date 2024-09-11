import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import type React from "react";
import { useMemo } from "react";

const CreateWorkspace: React.FC = () => {
  const users = useMemo(() => {
    return [
      {
        label: "Aryan",
        value: "aryan",
      },
      {
        label: "Kaush",
        value: "kaush",
      },
    ];
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Workspace</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create workspace</DialogTitle>
          <DialogDescription>Create a new workspace and invite your teammates to collaborate</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="name">Workspace name</Label>
            <Input id="name" placeholder="Workspace name" className="col-span-4" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <MultiSelect options={users} placeholder="Select users" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspace;
