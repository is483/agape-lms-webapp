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
        <iframe width="700" height="600" title="Sessions Dashboard" src="https://lookerstudio.google.com/u/0/reporting/9ef7fcb5-7d29-4d05-968c-a2ed6fe7fb2a/page/fmyrD" style={{ borderRadius: '5px' }} allowFullScreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" />
      </Flex>
    </Flex>
  )
}
export default SessionMetrics
