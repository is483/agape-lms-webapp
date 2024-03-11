import {
  Text, Alert, AlertIcon, Flex,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

function SessionMetrics() {
  const { mentoringJourneyId } = useParams()
  return (
    <Flex flexDir="column">
      <Alert status="info" mt="5" rounded="md">
        <AlertIcon />
        <Text>
          To track the sessions completed for the current mentoring journey, <b>  select the following Mentoring Journey ID: {mentoringJourneyId}</b>. Use this ID to filter the dashboard accordingly.
        </Text>
      </Alert>
      <Flex justifyContent="center" mt="10">
        {/* // TODO: Update after Bong is that */}
        <iframe width="600" height="450" title="Sessions Dashboard" src="https://lookerstudio.google.com/embed/reporting/33f17403-52fa-4e85-8cb3-a1db82f54f52/page/X8esD" style={{ border: '0' }} allowFullScreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" />
      </Flex>
    </Flex>
  )
}
export default SessionMetrics
