/* eslint-disable no-param-reassign */
import { useImmer } from 'use-immer'
import {
  Box, Button, Flex, Text,
} from '@chakra-ui/react'
import Question from './Question'
import { Question as QuestionType, Section } from './types'
import { clearErrors } from '../../../utils'

type QuestionState = QuestionType & {
  answer: string
  error: string
}
interface QuestionListProps {
  isView: boolean
  sectionsWithAnswers?: {
    sectionTitle: string
    questions: QuestionState[]
  }[]
  sections?: Section[]
  onSubmit: (answers: any) => void
}

const createQuestionsState = (sections: Section[]): {
  sectionTitle: string
  questions: QuestionState[]
}[] => sections.map((section) => ({
  sectionTitle: section.sectionTitle,
  questions: section.questions.map((question) => ({ ...question, answer: '', error: '' })),
}))

function QuestionList(props: QuestionListProps) {
  const {
    sections, sectionsWithAnswers, isView, onSubmit,
  } = props
  const [questionsState, updateQuestionsState] = useImmer(isView ? sectionsWithAnswers! : createQuestionsState(sections!))

  const handleAnswerChange = (sectionIndex: number, questionIndex: number, value: string) => {
    updateQuestionsState((draft) => {
      draft[sectionIndex].questions[questionIndex].answer = value
    })
  }

  const handleSubmit = () => {
    let hasError: boolean = false
    updateQuestionsState((draft) => {
      clearErrors(draft)
    })

    questionsState.forEach((section, sectionIndex: number) => {
      section.questions.forEach(({ answer }, questionIndex: number) => {
        if (!answer.trim()) {
          updateQuestionsState((draft) => {
            draft[sectionIndex].questions[questionIndex].error = 'Answer is required'
            hasError = true
          })
        }
      })
    })

    if (hasError) return

    onSubmit(questionsState)
  }

  return (
    <>
      {questionsState.map(({ sectionTitle, questions }, sectionIndex: number) => (
        <Box>
          <Text fontWeight="600" mt="12" mb="8" align="center">{sectionTitle}</Text>
          {questions.map(({
            question, type, answer, options, error,
          }, questionIndex: number) => {
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
                options={options}
                error={error}
              />
            )
          })}
        </Box>
      ))}
      {!isView && (
        <Flex justify="flex-end" mt="4">
          <Button onClick={handleSubmit} colorScheme="red">Submit</Button>
        </Flex>
      )}
    </>
  )
}

QuestionList.defaultProps = {
  sections: [],
  sectionsWithAnswers: [],
}

export default QuestionList
