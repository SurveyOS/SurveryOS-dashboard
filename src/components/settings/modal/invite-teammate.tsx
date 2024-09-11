import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combo-box";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type React from "react";
import { useMemo, useState } from "react";

const InviteTeammate: React.FC = () => {
  const [workspaceIdValue, setWorkspaceIdValue] = useState<string>("");

  const workspaces = useMemo(() => {
    return [];
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Invite Teammate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Teammate</DialogTitle>
          <DialogDescription>Invite a teammate to your workspace for free</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input id="name" placeholder="Email" type="email" className="col-span-4" />
          </div>
          <div className="grid grid-cols-2 items-center gap-12 w-full">
            <Combobox
              label={"Select workspace"}
              searchPlaceholder={"Search workspace"}
              emptyPlaceholder={"No workspace found"}
              items={workspaces}
              value={workspaceIdValue}
              setValue={setWorkspaceIdValue}
            />

            <Select>
              <SelectTrigger className="w-[165px]">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="creator">Creator</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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

export default InviteTeammate;
