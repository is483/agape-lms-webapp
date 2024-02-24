/* eslint-disable no-param-reassign */
import { useImmer } from 'use-immer'
import Question from './Question'
import { Question as QuestionType } from './types'

interface QuestionListProps {
  isView: boolean
  questions: QuestionType[]
}

type QuestionState = QuestionType & {
  answer: string
  error: string
}

const createQuestionsState = (questions: QuestionType[]): QuestionState[] => questions.map((question) => ({ ...question, answer: '', error: '' }))

function QuestionList(props: QuestionListProps) {
  const { questions, isView } = props
  const [questionsState, updateQuestionsState] = useImmer<QuestionState[]>(createQuestionsState(questions))

  const handleAnswerChange = (index: number, value: string) => {
    updateQuestionsState((draft) => {
      draft[index].answer = value
    })
  }

  return questionsState.map(({ question, type, answer }, index: number) => {
    const onChange = (value: string) => {
      handleAnswerChange(index, value)
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
  })
}

export default QuestionList
