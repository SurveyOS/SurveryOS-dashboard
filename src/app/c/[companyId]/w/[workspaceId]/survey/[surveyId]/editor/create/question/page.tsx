"use client"
import React from "react"
import { useRouter, useParams } from "next/navigation"
import Question from "@/components/question/Question"
import { useFieldArray, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import QuestionType from "@/components/question/QuestionType"

type Props = {}

const page = (props: Props) => {
  const { workspaceId, companyId, surveyId } = useParams()
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      questions: [
        {
          introduction: "",
          label: "",
          settings: {
            isRequired: false,
          },
          type: "TEXT",
        },
      ],
    },
  })
  const [showQuestionType, setShowQuestionType] = React.useState(false)
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "questions",
    }
  )

  const onSubmit = (data: any) => {
    console.log(data)
  }

  const handleAddQuestion = (type:string) => {
    append({
      introduction: "",
      label: "",
      settings: {
        isRequired: false,
      },
      type: type,
    })
    setShowQuestionType(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => {
        return (
          <Question
            key={field.id}
            index={index}
            field={field}
            remove={remove}
            swap={swap}
            move={move}
            insert={insert}
            register={register}
          />
        )
      })}
      <Button onClick={() => setShowQuestionType(true)} type="button">
        Add Question
      </Button>
      <Button type="submit">Submit</Button>
      {showQuestionType && <QuestionType handleAddQuestion={handleAddQuestion} />}
    </form>
  )
}

export default page
