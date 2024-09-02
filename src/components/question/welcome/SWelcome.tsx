import { Input } from "@/components/ui/input"
import React from "react"
import { UseFormReturn } from "react-hook-form"
import { QuestionType } from "../type"

type Props = {
  type: QuestionType
  methods: UseFormReturn
  index: number
}
/**
 *
 * @param props
 * @returns this component will be input box and will be used to collect the welcome message from the user.
 */

const SWelcome = ({ type, methods, index }: Props) => {
  const { register } = methods
  return (
    <Input
      {...register(`questions.${index}.label`)}
      placeholder="Enter your welcome message"
    />
  )
}

export default SWelcome
