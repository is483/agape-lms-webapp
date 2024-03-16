import {
  Flex, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack, Text,
} from '@chakra-ui/react'
import { SessionResponse } from '../../../app/services/session/types'
import { Link } from '../../../components'
import paths from '../../../paths'

interface UpcomingandPastSessionProps {
  data: SessionResponse
}

function UpcomingAndPastSessionsTable(props: UpcomingandPastSessionProps) {
  const { data } = props

  return (
    <TableContainer whiteSpace="unset" width="100%">
      <Table variant="simple">
        <Thead backgroundColor="gray.100">
          <Tr>
            <Th>Date & Time</Th>
            <Th>Title</Th>
            <Th> Type </Th>
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
              fromDateTime, toDateTime, title, sessionType, sessionId,
            } = session

            const fromDateTimeUTC = new Date(fromDateTime)
            const fromDateTimeSGT = new Date(fromDateTimeUTC.getTime() + 8 * 60 * 60 * 1000)
            const fromDate = fromDateTimeSGT.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            const fromTime = fromDateTimeSGT.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

            const toDateTimeUTC = new Date(toDateTime)
            const toDateTimeSGT = new Date(toDateTimeUTC.getTime() + 8 * 60 * 60 * 1000)
            const toDate = toDateTimeSGT.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            const toTime = toDateTimeSGT.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

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
