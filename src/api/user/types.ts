export interface MeResponse {
  _id: string;
  name: string;
  email: string;
  workspaces: Workspaces[];
  company: Company;
}

export interface Workspaces {
  workspace: Workspace;
  role: string;
  _id: string;
}

export interface Workspace {
  _id: string;
  name: string;
  company: string;
  users: User[];
  __v: number;
}

export interface User {
  user: string;
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
