import CreateWorkspace from "@/components/settings/modal/create-workspace";
import { DeleteWorkspace } from "@/components/settings/modal/delete-workspace";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

const workspace = [
  {
    id: 1,
    name: "Aryan's workspace",
    users: [
      { id: 1, name: "Aryan" },
      { id: 1, name: "Kaush" },
    ],
  },
];

const WorkspaceSettings: React.FC = () => {
  return (
    <Card className="p-8 gap-3">
      <div className="flex justify-end pb-4">
        <CreateWorkspace />
      </div>
      <Table>
        <TableCaption>Your workspaces</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Workspace</TableHead>
            <TableHead className="w-[600px]">Users</TableHead>
            <TableHead className="text-right" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {workspace.map((info) => (
            <TableRow key={info.id}>
              <TableCell className="font-medium">{info.name}</TableCell>
              <TableCell>{info.users.map((user) => user.name).join(", ")}</TableCell>
              <TableCell className="text-right">
                <Button variant={"ghost"}>
                  <Pencil1Icon className="w-5 h-5 text-gray-500 cursor-pointer" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant={"ghost"}>
                      <TrashIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                    </Button>
                  </AlertDialogTrigger>
                  <DeleteWorkspace />
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default WorkspaceSettings;
