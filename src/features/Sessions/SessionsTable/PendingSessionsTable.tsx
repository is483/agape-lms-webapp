import {
  Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/react'
import { useAppSelector } from '../../../hooks'
import { getAuth } from '../../../app/redux/selectors'
import { SessionResponse } from '../../../app/services/session/types'

interface PendingSessionsTableProps {
  data: SessionResponse
}

function PendingSessionsTable(props: PendingSessionsTableProps) {
  const { data } = props
  const { role } = useAppSelector(getAuth)
  return role === 'Mentor' ? (
    <PendingSessionsTableMentor data={data} />
  ) : (
    <PendingSessionsTableMentee data={data} />
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
          <Tr>
            <Td>
              <Flex gap="2" align="center" />
            </Td>
            <Td />
            <Td />
            <Td />
            <Td />
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

function PendingSessionsTableMentee(props: PendingSessionsTableProps) {
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
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <Flex gap="2" align="center" />
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
