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
          {data.map((session) => {
            const {
              fromDateTime, toDateTime, title, sessionType, sessionId,
            } = session

            const fromDateObject = new Date(fromDateTime)
            const fromDate = fromDateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            const fromTime = fromDateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

            const toDateObject = new Date(toDateTime)
            const toDate = toDateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            const toTime = toDateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

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
