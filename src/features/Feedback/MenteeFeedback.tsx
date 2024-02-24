import { Box, Text } from '@chakra-ui/react'
import Feedback from './Feedback'
import { Container } from '../../components'

function MenteeFeedback() {
  return (
    <Container minHeight="calc(100vh - 32px)">
      <Box paddingY="5">
        <Text fontSize="2xl" fontWeight="600"> Feedback </Text>
        <Text color="secondary.500">Manage your feedback for each session and quarter of each milestone</Text>
      </Box>
      <Feedback />
    </Container>
  )
}
export default MenteeFeedback
