import { Box, Text } from '@chakra-ui/react'
import Feedback from './Feedback'

function MentorFeedback() {
  return (
    <Box>
      <Text marginBottom="7" marginTop="2" color="secondary.500">Manage your feedback for each session and quarter of each milestone</Text>
      <Feedback />
    </Box>
  )
}
export default MentorFeedback
