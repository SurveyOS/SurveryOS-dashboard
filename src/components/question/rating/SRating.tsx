import { Input } from "@/components/ui/input";
import React from "react";
import type { QuestionProp } from "../type";
import CSatRating from "./CSatRating";
import ShapeRating from "./ShapeRating";

type Props = QuestionProp;

/**
 *
 * @param props
 * @returns this component will be responsible for rendering the rating field for the question.
 * stars
 */

const SRating = ({ type, methods, index }: Props) => {
  const { register, watch } = methods;
  const options = watch(`questions.${index}.options`);
  return (
    <div>
      <Input placeholder="Enter your question" {...register(`questions.${index}.label`)} />
      <label> Scale style </label>
      <select {...register(`questions.${index}.options`)} className="w-full mt-2 p-2 border border-gray-200 rounded-md">
        <option value="classisCsat">Classis CSAT</option>
        <option value="shapes">Shapes</option>
      </select>
      {/* if user select shapes show <ShapeRating /> else show <CSatRating /> */}
      {options === "shapes" ? (
        <ShapeRating type={type} methods={methods} index={index} />
      ) : (
        <CSatRating type={type} methods={methods} index={index} />
      )}
    </div>
  );
};

export default SRating;
