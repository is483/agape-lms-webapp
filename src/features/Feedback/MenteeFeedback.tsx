import { Box, Text } from '@chakra-ui/react'
import Feedback from './Feedback'
import { Container } from '../../components'
import { useGetMenteeQuarterlyFeedbackQuery, useGetMenteeSessionFeedbackQuery } from '../../app/services/feedback/apiFeedbackSlice'

function MenteeFeedback() {
  const { data: menteeSessionFeedbackData } = useGetMenteeSessionFeedbackQuery(null)
  const { data: menteeQuarterlyFeedbackData } = useGetMenteeQuarterlyFeedbackQuery(null)
  return (
    <Container minHeight="calc(100vh - 32px)">
      <Box paddingY="5">
        <Text fontSize="2xl" fontWeight="600"> Feedback </Text>
        <Text color="secondary.500">
          Manage your feedback for each session and quarter of each milestone.
          <b> Note that session feedback is only available for completed sessions.</b>
        </Text>
      </Box>
      <Feedback sessionFeedbackData={menteeSessionFeedbackData?.menteeSessionFeedbacks} quarterlyFeedbackData={menteeQuarterlyFeedbackData?.menteeQuarterlyFeedbacks} />
    </Container>
  )
}
export default MenteeFeedback
