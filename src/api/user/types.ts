export interface MeResponse {
  _id: string;
  name: string;
  email: string;
  workspaces: Workspace[];
  company: Company;
}

export interface Workspace {
  workspace: string;
  role: string;
  _id: string;
}

export interface Company {
  _id: string;
  name: string;
  admins: string[];
  users: any[];
  workspaces: string[];
  __v: number;
}
