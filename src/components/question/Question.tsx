import React from "react"
import { Input } from "../ui/input"
import {
  UseFieldArrayInsert,
  UseFieldArrayMove,
  UseFieldArrayRemove,
  UseFieldArraySwap,
  UseFormRegister,
} from "react-hook-form"
import { register } from "module"

type Props = {
  index: number
  field: any
  remove: UseFieldArrayRemove
  swap: UseFieldArraySwap
  move: UseFieldArrayMove
  insert: UseFieldArrayInsert<any>
  register: UseFormRegister<any>
}

const Question = ({
  field,
  index,
  remove,
  swap,
  move,
  insert,
  register,
}: Props) => {
  return (
    <Input
      {...register(`questions.${index}.label`)}
      placeholder="Enter your question here"
    />
  )
}

export default Question
