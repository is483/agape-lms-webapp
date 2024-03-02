import { useToast } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { Container } from '../../../components'
import QuestionList from '../components/QuestionList'
import { MENTEE_QUARTERLY_QUESTIONS } from '../constants'
import { useAnswerMenteeQuarterlyFeedbackMutation, useGetMenteeQuarterlyFeedbackQuery } from '../../../app/services/feedback/apiFeedbackSlice'
import { SectionWithAnswers } from '../components/types'

function MenteeQuarterlyFeedbackQuestionnaire() {
  const { quarterFeedbackId } = useParams()
  const { data } = useGetMenteeQuarterlyFeedbackQuery(quarterFeedbackId!)
  const [answerFeedback] = useAnswerMenteeQuarterlyFeedbackMutation()
  const toast = useToast()

  const onSubmit = async (answers: any) => {
    const answerFeedbackRequest = {
      feedbackAnswers: answers,
      id: quarterFeedbackId!,
    }
    await answerFeedback(answerFeedbackRequest).unwrap()
    toast({
      title: 'Feedback answered',
      description: 'Session feedback has been successfully submitted',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'bottom-right',
    })
  }

  const feedbackAnswers = JSON.parse(data?.feedbackAnswers ?? '{}') as SectionWithAnswers

  return (
    <Container minHeight="calc(100vh - 32px)">
      <QuestionList
        isView={!!data?.feedbackAnswers}
        sections={MENTEE_QUARTERLY_QUESTIONS}
        sectionsWithAnswers={feedbackAnswers}
        onSubmit={onSubmit}
      />
    </Container>
  )
}

export default MenteeQuarterlyFeedbackQuestionnaire
