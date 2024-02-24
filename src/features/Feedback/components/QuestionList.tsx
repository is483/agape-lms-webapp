/* eslint-disable no-param-reassign */
import { useImmer } from 'use-immer'
import { Box, Text } from '@chakra-ui/react'
import Question from './Question'
import { Question as QuestionType, Section } from './types'

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
}

const createQuestionsState = (sections: Section[]): {
  sectionTitle: string
  questions: QuestionState[]
}[] => sections.map((section) => ({
  sectionTitle: section.sectionTitle,
  questions: section.questions.map((question) => ({ ...question, answer: '', error: '' })),
}))

function QuestionList(props: QuestionListProps) {
  const { sections, sectionsWithAnswers, isView } = props
  const [questionsState, updateQuestionsState] = useImmer(isView ? sectionsWithAnswers! : createQuestionsState(sections!))

  const handleAnswerChange = (sectionIndex: number, questionIndex: number, value: string) => {
    updateQuestionsState((draft) => {
      draft[sectionIndex].questions[questionIndex].answer = value
    })
  }

  return questionsState.map(({ sectionTitle, questions }, sectionIndex: number) => (
    <Box>
      <Text fontWeight="600" mt="12" mb="8" align="center">{sectionTitle}</Text>
      {questions.map(({
        question, type, answer, options,
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
          />
        )
      })}
    </Box>
  ))
}

export default QuestionList
