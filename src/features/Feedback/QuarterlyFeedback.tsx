import {
  Table, TableContainer, Tbody, Th, Thead, Tr,
} from '@chakra-ui/react'

function QuarterlyFeedback() {
  return (
    <TableContainer whiteSpace="unset" width="100%">
      <Table variant="simple">
        <Thead backgroundColor="gray.100">
          <Tr>
            <Th>Quarter</Th>
            <Th>Date</Th>
            <Th>Status</Th>
            <Th>Available In</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody />
      </Table>
    </TableContainer>
  )
}
export default QuarterlyFeedback
