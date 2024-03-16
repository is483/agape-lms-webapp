import {
  Text, Alert, AlertIcon, Flex,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

function GoalMetrics() {
  const { mentoringJourneyId } = useParams()
  return (
    <Flex flexDir="column">
      <Alert status="info" mt="5" rounded="md">
        <AlertIcon />
        <Text>
          To track the goals completed for the current mentoring journey, <b>  select the following Mentoring Journey ID: {mentoringJourneyId}</b>. Use this ID to filter the dashboard accordingly.
        </Text>
      </Alert>
      <Flex justifyContent="center" mt="10">
        <iframe width="700" height="600" title="Goals Dashboard" src="https://lookerstudio.google.com/embed/reporting/33f17403-52fa-4e85-8cb3-a1db82f54f52/page/X8esD" style={{ borderRadius: '5px' }} allowFullScreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" />
      </Flex>
    </Flex>
  )
}
export default GoalMetrics
