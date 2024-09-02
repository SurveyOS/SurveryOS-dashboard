"use client"
import React from "react"
import { useRouter, useParams } from "next/navigation"
import Question from "@/components/question/Question"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import QuestionType from "@/components/question/QuestionType"
import { generateKeySync } from "crypto"
import { generateId } from "@/lib/utils"
import Preview from "@/components/question/preview/Preview"

type Props = {}

const page = (props: Props) => {
  const { workspaceId, companyId, surveyId } = useParams()
  // const { control, register, handleSubmit } = useForm({
  //   defaultValues: {
  //     questions: [
  //       {
  //         introduction: "",
  //         label: "",
  //         settings: {
  //           isRequired: false,
  //         },
  //         type: "TEXT",
  //       },
  //     ],
  //   },
  // })
  const [showQuestionType, setShowQuestionType] = React.useState(false)

  const methods = useForm({
    defaultValues: {
      questions: [
        {
          introduction: "",
          label: "",
          settings: {
            isRequired: false,
          },
          type: "TEXT",
          questionId: generateId(10),
        },
      ],
    },
  })
  const onSubmit = (data: any) => {
    console.log(data)
  }

  const fieldsMethod = useFieldArray({
    control: methods.control,
    name: "questions",
  })

  const handleAddQuestion = (type: string) => {
    fieldsMethod.append({
      introduction: "",
      label: "",
      settings: {
        isRequired: false,
      },
      type: type,
      questionId: generateId(10),
    })
    setShowQuestionType(false)
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4px",
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {fieldsMethod.fields.map((field, index) => {
            return (
              <>
                <Question
                  key={field.id}
                  index={index}
                  fieldsMethod={fieldsMethod}
                  methods={methods}
                />
                <div className="mt-2"/>
              </>
            )
          })}
          <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
            <Button
              variant="secondary"
              onClick={() => setShowQuestionType(true)}
              type="button"
            >
              Add Question
            </Button>
            <Button type="submit">Submit</Button>
            {showQuestionType && (
              <QuestionType handleAddQuestion={handleAddQuestion} />
            )}
          </div>
        </form>
      </FormProvider>
      <Preview />
    </div>
  )
}

export default page
