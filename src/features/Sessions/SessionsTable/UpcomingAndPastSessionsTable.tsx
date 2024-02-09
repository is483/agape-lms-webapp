import {
  Button, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr,
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
          <Tr>
            <Td>
              <Flex gap="2" align="center" />
            </Td>
            <Td />
            <Td />
            <Td>
              <Flex justify="end">
                <Button>View Details</Button>
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
export default UpcomingAndPastSessionsTable
