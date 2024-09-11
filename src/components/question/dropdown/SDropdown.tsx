import { Input } from "@/components/ui/input";
import React from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import type { QuestionType } from "../type";

type Props = {
  type: QuestionType;
  methods: UseFormReturn;
  index: number;
};
/**
 *
 * @param props
 * @returns this component will be responsible for rendering the dropdown field for the question.
 * it can either be SINGLE_SELECT or MULTIPLE_CHOICE
 */

const SDropdown = ({ type, methods, index }: Props) => {
  const { control } = methods;
  const {
    fields: options,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });
  return (
    <>
      <Input {...methods.register(`questions.${index}.label`)} placeholder="Enter your question" />
      <div>
        {options.map((option, optionIndex) => (
          <div key={option.id}>
            <Input
              {...methods.register(`questions.${index}.options.${optionIndex}.label`)}
              placeholder="Enter option"
            />
            <button type="button" onClick={() => remove(optionIndex)}>
              Delete
            </button>
          </div>
        ))}
        <button type="button" onClick={() => append({ label: "" })}>
          Add Option
        </button>
      </div>
    </>
  );
};

export default SDropdown;
