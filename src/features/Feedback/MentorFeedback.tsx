import { Box, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import Feedback from './Feedback'
import { useGetAllMentorQuarterlyFeedbackQuery, useGetAllMentorSessionFeedbackQuery } from '../../app/services/feedback/apiFeedbackSlice'

function MentorFeedback() {
  const { mentoringJourneyId } = useParams()
  const { data: mentorSessionFeedbackData } = useGetAllMentorSessionFeedbackQuery(mentoringJourneyId!)
  const { data: mentorQuarterlyFeedbackData } = useGetAllMentorQuarterlyFeedbackQuery(mentoringJourneyId!)
  return (
    <Box>
      <Text marginBottom="7" marginTop="2" color="secondary.500">
        Manage your feedback for each session and quarter of each milestone.
        <b> Note that session feedback is only available for completed sessions.</b>
      </Text>
      <Feedback sessionFeedbackData={mentorSessionFeedbackData?.mentorSessionFeedbacks} quarterlyFeedbackData={mentorQuarterlyFeedbackData?.mentorQuarterlyFeedbacks} />
    </Box>
  )
}
export default MentorFeedback
