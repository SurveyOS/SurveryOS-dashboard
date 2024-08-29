import React from "react"

type Props = {
  handleAddQuestion: (type: string) => void
}

const Types = [
  "TEXT",
  "WELCOME",
  "THANKYOU",
  "MULTIPLE_CHOICE",
  "SINGLE_SELECT",
]

const QuestionType = ({ handleAddQuestion }: Props) => {
  return (
    <div>
      Question Type
      {Types.map((type) => {
        return (
          <div onClick={() => handleAddQuestion(type)} key={type}>
            {type}
          </div>
        )
      })}
    </div>
  )
}

export default QuestionType
