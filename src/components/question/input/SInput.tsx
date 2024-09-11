import { Input } from "@/components/ui/input";
import React from "react";
import type { UseFormReturn } from "react-hook-form";
import { QuestionType } from "../type";

type Props = {
  type: QuestionType;
  methods: UseFormReturn;
  index: number;
};

/**
 *
 * @param props
 * @returns this component will be responsible for rendering the input field for the question.
 * it can either be TEXT or NUMBER
 */
const SInput = ({ type, methods, index }: Props) => {
  const { register } = methods;
  return (
    <div>
      <Input
        {...register(`questions.${index}.label`)}
        type={type === QuestionType.TEXT ? "text" : "number"}
        placeholder="Enter your question"
      />
    </div>
  );
};

export default SInput;
