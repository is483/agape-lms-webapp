import { useParams } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { Container } from '../../../components'
import QuestionList from '../components/QuestionList'
import { SectionWithAnswers } from '../components/types'
import { MENTEE_SESSION_QUESTIONS } from '../constants'
import { useAnswerMenteeSessionFeedbackMutation, useGetMenteeSessionFeedbackQuery } from '../../../app/services/feedback/apiFeedbackSlice'

function MenteeSessionFeedbackQuestionnaire() {
  const { sessionFeedbackId } = useParams()
  const { data } = useGetMenteeSessionFeedbackQuery(sessionFeedbackId!)
  const [answerFeedback] = useAnswerMenteeSessionFeedbackMutation()
  const toast = useToast()

  const onSubmit = async (answers: any) => {
    const answerFeedbackRequest = {
      feedbackAnswers: answers,
      id: sessionFeedbackId!,
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
        sections={MENTEE_SESSION_QUESTIONS}
        sectionsWithAnswers={feedbackAnswers}
        onSubmit={onSubmit}
      />
    </Container>
  )
}

export default MenteeSessionFeedbackQuestionnaire
