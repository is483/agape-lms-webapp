/* eslint-disable no-param-reassign */
import { useImmer } from 'use-immer'
import { Box, Text } from '@chakra-ui/react'
import Question from './Question'
import { Question as QuestionType } from './types'

interface QuestionListProps {
  isView: boolean
  sections: {
    sectionTitle: string
    questions: QuestionType[]
  }[]
}

type QuestionState = QuestionType & {
  answer: string
  error: string
}

const createQuestionsState = (sections: {
  sectionTitle: string
  questions: QuestionType[]
}[]): {
  sectionTitle: string
  questions: QuestionState[]
}[] => sections.map((section) => ({
  sectionTitle: section.sectionTitle,
  questions: section.questions.map((question) => ({ ...question, answer: '', error: '' })),
}))

function QuestionList(props: QuestionListProps) {
  const { sections, isView } = props
  const [questionsState, updateQuestionsState] = useImmer(createQuestionsState(sections))

  const handleAnswerChange = (sectionIndex: number, questionIndex: number, value: string) => {
    updateQuestionsState((draft) => {
      draft[sectionIndex].questions[questionIndex].answer = value
    })
  }

  return questionsState.map(({ sectionTitle, questions }, sectionIndex: number) => (
    <Box>
      <Text>{sectionTitle}</Text>
      {questions.map(({ question, type, answer }, questionIndex: number) => {
        const onChange = (value: string) => {
          handleAnswerChange(sectionIndex, questionIndex, value)
        }

        return (
          <Question
            isView={isView}
            question={question}
            value={answer}
            type={type}
            onChange={onChange}
          />
        )
      })}
    </Box>
  ))
}

export default QuestionList
