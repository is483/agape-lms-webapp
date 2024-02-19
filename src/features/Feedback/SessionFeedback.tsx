import {
  Table, TableContainer, Tbody, Th, Thead, Tr,
} from '@chakra-ui/react'

function SessionFeedback() {
  return (
    <TableContainer whiteSpace="unset" width="100%">
      <Table variant="simple">
        <Thead backgroundColor="gray.100">
          <Tr>
            <Th>Date & Time</Th>
            <Th>Title</Th>
            <Th>Type</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody />
      </Table>
    </TableContainer>
  )
}
export default SessionFeedback
