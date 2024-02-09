import {
  Flex, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack, Text,
} from '@chakra-ui/react'
import { SessionResponse } from '../../../app/services/session/types'

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
              fromDateTime, title, sessionType,
            } = session

            const dateObject = new Date(fromDateTime)
            const date = dateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            const time = dateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

            return (
              <Tr>
                <Td>
                  <VStack alignItems="start">
                    <Text color="primary.800"> {date}</Text>
                    <Text> {time}</Text>
                  </VStack>
                </Td>
                <Td>
                  {title}
                </Td>
                <Td>
                  {sessionType.charAt(0).toUpperCase() + sessionType.slice(1)}
                </Td>
                <Td>
                  <Flex justify="end">
                    <Button>View Details</Button>
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
