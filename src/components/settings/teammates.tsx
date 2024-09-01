import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import InviteTeammate from "./modal/invite-teammate";

const teammates = [
  {
    id: 1,
    name: "Aryan Dwivedi",
    email: "aryandwivd@gmail.com",
    workspaces: "All workspaces",
  },
];

const TeammatesSettings: React.FC = () => {
  return (
    <Card className="p-8 gap-3">
      <div className="flex justify-end pb-4">
        <InviteTeammate />
      </div>
      <Table>
        <TableCaption>Your teammates</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Name</TableHead>
            <TableHead className="w-[300px]">Email</TableHead>
            <TableHead className="text-right">Workspaces</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teammates.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell className="text-right">{member.workspaces}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default TeammatesSettings;
