import type { UseFormReturn } from "react-hook-form";

export enum QuestionType {
  TEXT = "TEXT",
  WELCOME = "WELCOME",
  THANKYOU = "THANKYOU",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  SINGLE_SELECT = "SINGLE_SELECT",
  SMILEY = "SMILEY",
  RATING = "RATING",
  NUMBER = "NUMBER",
}

export type QuestionProp = {
  type: QuestionType;
  methods: UseFormReturn;
  index: number;
};
