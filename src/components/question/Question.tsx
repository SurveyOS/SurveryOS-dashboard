import React from "react";
import {
  type FieldValues,
  UseFieldArrayInsert,
  UseFieldArrayMove,
  UseFieldArrayRemove,
  type UseFieldArrayReturn,
  UseFieldArraySwap,
  UseFormProps,
  UseFormRegister,
  type UseFormReturn,
} from "react-hook-form";
import { Input } from "../ui/input";
import SDropdown from "./dropdown/SDropdown";
import SInput from "./input/SInput";
import SRating from "./rating/SRating";
import SSmiley from "./smiley/SSmiley";
import { QuestionType } from "./type";
import SWelcome from "./welcome/SWelcome";

type Props = {
  index: number;
  fieldsMethod: UseFieldArrayReturn<FieldValues, "questions", "id">;
  methods: UseFormReturn;
};

const renderQuestion = (type: QuestionType, methods: UseFormReturn, index: number) => {
  switch (type) {
    case QuestionType.TEXT:
    case QuestionType.NUMBER:
      return <SInput type={type} methods={methods} index={index} />;
    case QuestionType.WELCOME:
      return <SWelcome type={type} methods={methods} index={index} />;
    case QuestionType.THANKYOU:
      return <Input />;
    case QuestionType.MULTIPLE_CHOICE:
    case QuestionType.SINGLE_SELECT:
      return SDropdown({ type, methods, index });
    case QuestionType.SMILEY:
      return SSmiley({ type, methods, index });
    case QuestionType.RATING:
      return SRating({ type, methods, index });

    default:
      return <Input />;
  }
};

const Question = ({ index, fieldsMethod, methods }: Props) => {
  return (
    <div>
      {
        // @ts-ignore
        renderQuestion(fieldsMethod.fields[index].type, methods, index)
      }
    </div>
  );
};

export default Question;
