import {
  Box, Text,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useGetAllSessionFeedbackByMentoringJourneyQuery, useGetAllQuarterlyFeedbackByMentoringJourneyQuery } from '../../../../app/services/feedback/apiFeedbackSlice'
import Feedback from '../../../Feedback/Feedback'

function AdminFeedback() {
  const { mentoringJourneyId } = useParams()
  const { data: allSessionFeedbackData } = useGetAllSessionFeedbackByMentoringJourneyQuery(mentoringJourneyId!)
  const { data: allQuarterlyFeedbackData } = useGetAllQuarterlyFeedbackByMentoringJourneyQuery(mentoringJourneyId!)

  return (
    <Box>
      <Box paddingY="5">
        <Text color="secondary.500">
          Manage your feedback for each session and quarter of each milestone.
          <b> Note that session feedback is only available for completed sessions.</b>
        </Text>
      </Box>
      <Feedback sessionFeedbackData={allSessionFeedbackData} quarterlyFeedbackData={allQuarterlyFeedbackData} />
    </Box>
  )
}
export default AdminFeedback
