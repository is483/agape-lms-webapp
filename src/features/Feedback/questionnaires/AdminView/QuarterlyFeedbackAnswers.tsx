import { useParams } from 'react-router-dom'
import { Text } from '@chakra-ui/react'
import { Container } from '../../../../components'
import QuestionList from '../../components/QuestionList'
import { MENTOR_QUARTERLY_QUESTIONS } from '../../constants'
import { useGetMentorQuarterlyFeedbackQuery } from '../../../../app/services/feedback/apiFeedbackSlice'
import { SectionWithAnswers } from '../../components/types'
import { useGetMentoringJourneyOverviewQuery } from '../../../../app/services/mentoringJourney/apiMentoringJourneySlice'

function MentorQuarterlyFeedbackQuestionnaire() {
  const { quarterFeedbackId, mentoringJourneyId, quarter } = useParams()
  const { data: feedbackData } = useGetMentorQuarterlyFeedbackQuery(quarterFeedbackId!)
  const { data: mentoringJourneyData } = useGetMentoringJourneyOverviewQuery(mentoringJourneyId!)
  const feedbackAnswers = JSON.parse(feedbackData?.feedbackAnswers ?? '{}') as SectionWithAnswers

  return (
    <>
      {/* TODO: Add Mentor + Mentee */}
      <Container mb="4">
        <Text fontSize="lg" fontWeight="bold">{mentoringJourneyData?.title}</Text>
        <Text fontSize="md" fontWeight="semi-bold">Quarter {quarter} Feedback answers</Text>
      </Container>
      <Container>
        <QuestionList
          isView={!!feedbackData?.feedbackAnswers}
          sections={MENTOR_QUARTERLY_QUESTIONS}
          sectionsWithAnswers={feedbackAnswers}
          onSubmit={() => 0}
        />
      </Container>
    </>
  )
}

export default MentorQuarterlyFeedbackQuestionnaire
