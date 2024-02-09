import {
  Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Badge, Text, VStack,
} from '@chakra-ui/react'
import { useAppSelector } from '../../../hooks'
import { getAuth } from '../../../app/redux/selectors'
import { SessionResponse } from '../../../app/services/session/types'
import { Icon } from '../../../components'

interface PendingSessionsTableProps {
  data: SessionResponse
}

function PendingSessionsTable(props: PendingSessionsTableProps) {
  const { data } = props
  const { role } = useAppSelector(getAuth)
  return role === 'Mentor' ? (
    <PendingSessionsTableMentor data={data} />
  ) : (
    <PendingSessionsTableMentee />
  )
}

function PendingSessionsTableMentor(props: PendingSessionsTableProps) {
  const { data } = props

  return (
    <TableContainer whiteSpace="unset" width="100%">
      <Table variant="simple">
        <Thead backgroundColor="gray.100">
          <Tr>
            <Th>Date & Time</Th>
            <Th>Title</Th>
            <Th> Type </Th>
            <Th> Status </Th>
            <Th> Reason </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((session) => {
            const {
              fromDateTime, title, sessionType, status, reason,
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
                  {sessionType}
                </Td>
                <Td>
                  <Badge
                    colorScheme={status === 'pending_confirmation' ? 'yellow' : 'red'}
                  >
                    {status === 'pending_confirmation' ? 'Awaiting Confirmation' : 'Rejected'}
                  </Badge>
                </Td>
                <Td>
                  {reason && <Icon name="info" />}

                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

function PendingSessionsTableMentee() {
  return (
    <TableContainer whiteSpace="unset" width="100%">
      <Table variant="simple">
        <Thead backgroundColor="gray.100">
          <Tr>
            <Th>Date & Time</Th>
            <Th>Title</Th>
            <Th> Type </Th>
            <Th> Status </Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              Hello
            </Td>
            <Td />
            <Td />
            <Td>
              <Flex justify="end" />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default PendingSessionsTable
