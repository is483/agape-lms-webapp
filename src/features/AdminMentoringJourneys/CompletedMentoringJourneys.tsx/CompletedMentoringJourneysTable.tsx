import {
  Flex, TableContainer,
  Table, Thead, Tbody, Tr, Th,
} from '@chakra-ui/react'
import Metrics from '../Metrics'
import { ControlledSelect } from '../../../components'

function CompletedMentoringJourneysTable() {
  return (
    <Flex direction="column">
      <Metrics status="Completed" />
      <Flex justify="flex-end" marginY="5">
        <ControlledSelect options={[]} error="" />
      </Flex>
      <TableContainer whiteSpace="unset" width="100%">
        <Table variant="simple">
          <Thead backgroundColor="gray.100">
            <Tr>
              <Th>Mentor</Th>
              <Th>Mentee</Th>
              <Th>Title</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody />
        </Table>
      </TableContainer>
    </Flex>
  )
}
export default CompletedMentoringJourneysTable
