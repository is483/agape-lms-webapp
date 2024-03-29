import { useParams } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { useAnswerMentorSessionFeedbackMutation, useGetMentorSessionFeedbackQuery } from '../../../app/services/feedback/apiFeedbackSlice'
import { BackButton, Container } from '../../../components'
import QuestionList from '../components/QuestionList'
import { MENTOR_SESSION_QUESTIONS } from '../constants'
import { SectionWithAnswers } from '../components/types'

function MentorSessionFeedbackQuestionnaire() {
  const { sessionId } = useParams()
  const { data } = useGetMentorSessionFeedbackQuery(sessionId!)
  const [answerFeedback] = useAnswerMentorSessionFeedbackMutation()
  const toast = useToast()

  const onSubmit = async (answers: any) => {
    const answerFeedbackRequest = {
      feedbackAnswers: answers,
      id: sessionId!,
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
      <BackButton />
      <QuestionList
        isView={!!data?.feedbackAnswers}
        sections={MENTOR_SESSION_QUESTIONS}
        sectionsWithAnswers={feedbackAnswers}
        onSubmit={onSubmit}
      />
    </Container>
  )
}

export default MentorSessionFeedbackQuestionnaire
