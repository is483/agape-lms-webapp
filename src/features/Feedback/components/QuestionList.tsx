/* eslint-disable no-param-reassign */
import { useImmer } from 'use-immer'
import {
  Box, Button, Flex, Text,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import Question from './Question'
import { QuestionState, Section, SectionWithAnswers } from './types'
import { clearErrors, deepCopy } from '../../../utils'
import { getAuth } from '../../../app/redux/selectors'
import { useAppSelector } from '../../../hooks'

interface QuestionListProps {
  isView: boolean
  sectionsWithAnswers?: SectionWithAnswers
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
  const { role } = useAppSelector(getAuth)

  useEffect(() => {
    updateQuestionsState(isView ? sectionsWithAnswers! : createQuestionsState(sections!))
  }, [isView, sections, sectionsWithAnswers, updateQuestionsState])

  const handleAnswerChange = (sectionIndex: number, questionIndex: number, value: string) => {
    updateQuestionsState((draft) => {
      draft[sectionIndex].questions[questionIndex].answer = value
    })
  }

  const handleSubmit = () => {
    let hasError: boolean = false
    updateQuestionsState((draft) => clearErrors(draft))

    questionsState.forEach((section, sectionIndex: number) => {
      section.questions.forEach(({ answer }, questionIndex: number) => {
        if (section.questions[questionIndex].type === 'freeform' && answer.length > 1000) {
          updateQuestionsState((draft) => {
            draft[sectionIndex].questions[questionIndex].error = `Feedback must not exceed 1000 characters (${section.questions[questionIndex].answer.length} / 1000)`
          })
          hasError = true
        }
        if (!answer.trim().length) {
          updateQuestionsState((draft) => {
            draft[sectionIndex].questions[questionIndex].error = 'Answer is required'
          })
          hasError = true
        }
      })
    })

    if (hasError) return

    const request = deepCopy(questionsState)
    clearErrors(request)
    onSubmit(request)
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
                questionNo={questionIndex + 1}
                sectionNo={sectionIndex + 1}
                isView={isView || role === 'Admin'}
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
      {!isView && role !== 'Admin' && (
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
