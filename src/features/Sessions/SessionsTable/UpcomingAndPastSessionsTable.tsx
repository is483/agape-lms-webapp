import {
  Flex, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack, Text, Badge,
} from '@chakra-ui/react'
import { AllSessionsByMentoringJourneyResponse, SessionResponse } from '../../../app/services/session/types'
import { Link } from '../../../components'
import paths from '../../../paths'

interface UpcomingandPastSessionProps {
  data: SessionResponse | AllSessionsByMentoringJourneyResponse
  showStatus: boolean
}

function getStatusAndColor(status: string, toDateTime: string) {
  const todayDate = new Date()
  const sessionDate = new Date(toDateTime)

  if (status !== 'Confirmed') {
    return { displayStatus: 'Pending', colorScheme: 'yellow' }
  } if (sessionDate > todayDate) {
    return { displayStatus: 'Upcoming', colorScheme: 'green' }
  }
  return { displayStatus: 'Completed', colorScheme: 'red' }
}

function UpcomingAndPastSessionsTable(props: UpcomingandPastSessionProps) {
  const { data, showStatus } = props

  return (
    <TableContainer whiteSpace="unset" width="100%">
      <Table variant="simple">
        <Thead backgroundColor="gray.100">
          <Tr>
            <Th>Date & Time</Th>
            <Th>Title</Th>
            <Th> Type </Th>
            {showStatus && <Th> Status </Th>}
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {data.length === 0 && (
            <Tr>
              <Td colSpan={4}>
                <Flex height="40px" justify="center" align="center">
                  No sessions
                </Flex>
              </Td>
            </Tr>
          )}
          {data.map((session) => {
            const {
              fromDateTime, toDateTime, title, sessionType, sessionId, status,
            } = session
            const fromDateObject = new Date(fromDateTime)
            const fromDate = fromDateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            const fromTime = fromDateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

            const toDateObject = new Date(toDateTime)
            const toDate = toDateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            const toTime = toDateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
            const { displayStatus, colorScheme } = getStatusAndColor(status, toDateTime)
            return (
              <Tr>
                <Td>
                  <VStack alignItems="start">
                    <Text color="primary.800" fontSize="sm"> {fromDate === toDate ? fromDate : `${fromDate} - ${toDate}`}</Text>
                    <Text> {`${fromTime} to ${toTime}`}</Text>
                  </VStack>
                </Td>
                <Td>
                  {title}
                </Td>
                <Td textTransform="capitalize">
                  {sessionType}
                </Td>
                {showStatus && (
                  <Td>
                    <Badge colorScheme={colorScheme}>
                      {displayStatus}
                    </Badge>
                  </Td>
                )}
                <Td>
                  <Flex justify="end">
                    <Link to={`${paths.Sessions.Details.subPath}/${sessionId}`}>
                      <Button>View Details</Button>
                    </Link>
                  </Flex>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
export default UpcomingAndPastSessionsTable
