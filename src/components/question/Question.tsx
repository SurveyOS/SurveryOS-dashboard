import React from "react"
import { Input } from "../ui/input"
import {
  FieldValues,
  UseFieldArrayInsert,
  UseFieldArrayMove,
  UseFieldArrayRemove,
  UseFieldArrayReturn,
  UseFieldArraySwap,
  UseFormProps,
  UseFormRegister,
  UseFormReturn,
} from "react-hook-form"
import { register } from "module"
import { QuestionType } from "./type"
import SInput from "./input/SInput"
import SWelcome from "./welcome/SWelcome"
import SDropdown from "./dropdown/SDropdown"
import SSmiley from "./smiley/SSmiley"
import SRating from "./rating/SRating"

type Props = {
  index: number
  fieldsMethod: UseFieldArrayReturn<FieldValues, "questions", "id">
  methods: UseFormReturn
}

const renderQuestion = (
  type: QuestionType,
  methods: UseFormReturn,
  index: number
) => {
  switch (type) {
    case QuestionType.TEXT:
    case QuestionType.NUMBER:
      return <SInput type={type} methods={methods} index={index} />
    case QuestionType.WELCOME:
      return <SWelcome type={type} methods={methods} index={index} />
    case QuestionType.THANKYOU:
      return <Input />
    case QuestionType.MULTIPLE_CHOICE:
    case QuestionType.SINGLE_SELECT:
      return SDropdown({ type, methods, index })
    case QuestionType.SMILEY:
      return SSmiley({ type, methods, index })
    case QuestionType.RATING:
      return SRating({ type, methods, index })

    default:
      return <Input />
  }
}

const Question = ({ index, fieldsMethod, methods }: Props) => {
  return (
    <div>

      {
        // @ts-ignore
        renderQuestion(fieldsMethod.fields[index].type, methods, index)
      }
    </div>
  )
}

export default Question
