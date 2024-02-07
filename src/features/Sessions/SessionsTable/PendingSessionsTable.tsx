import {
  Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/react'
import { useAppSelector } from '../../../hooks'
import { getAuth } from '../../../app/redux/selectors'

function PendingSessionsTable() {
  const { role } = useAppSelector(getAuth)
  const TableComponent = role === 'Mentor' ? PendingSessionsTableMentor : PendingSessionsTableMentee
  return (
    <TableComponent />
  )
}

function PendingSessionsTableMentor() {
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
