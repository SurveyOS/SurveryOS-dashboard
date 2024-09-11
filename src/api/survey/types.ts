import type { Question } from "../question/type";
import type { ServerResponseType } from "../types";

export interface CreateSurveyRequest {
  workspaceId: string;
  questions: string[];
  theme?: string;
  language: string;
  config: Record<string, any>;
  type: "email" | "website" | "app";
  version: number;
  isDeleted?: boolean;
}

interface Survey {
  workspaceId: string;
  questions: Question[];
  theme: string;
  language: string;
  config: Record<string, any>;
  type: "email" | "website" | "app";
  version: number;
  _id: string;
  isDeleted?: boolean;
}

export interface SurveyResponse extends ServerResponseType<Survey | null> {}
