import {
  Button,
  Flex,
  Table, TableContainer, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/react'
import { QuarterlyFeedback as QuarterlyFeedbackType } from '../../app/services/feedback/type'
import { Link } from '../../components'
import paths from '../../paths'

interface QuarterlyFeedbackProps {
  data: QuarterlyFeedbackType[] | undefined
}
function QuarterlyFeedback(props: QuarterlyFeedbackProps) {
  const { data } = props
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
        <Tbody>
          {data?.map((feedback, index) => {
            const {
              date, status,
            } = feedback

            const quarterDateObject = new Date(date)
            const todayDateObject = new Date()

            const quarterDate = quarterDateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

            const dateDifference = Math.round((quarterDateObject.getTime() - todayDateObject.getTime()) / (1000 * 60 * 60 * 24))

            function getStatus(status: string) {
              if (status === 'Not Completed' && dateDifference <= 0) {
                return 'Pending'
              }
              if (status === 'Not Completed' && dateDifference > 0) {
                return 'Unavailable'
              }
              return 'Complete'
            }
            return (
              <Tr>
                <Td>
                  Quarter {index + 1}
                </Td>
                <Td>
                  {quarterDate}
                </Td>
                <Td textTransform="capitalize">
                  {getStatus(status)}
                </Td>
                <Td>
                  {dateDifference} days
                </Td>
                <Td>
                  <Flex justify="end" gap="5">
                    {/* TODO: Khye chun add integration  */}
                    {status === 'Not Completed' && (
                      <Link to={paths.Introduction}>
                        <Button size="sm" colorScheme="red" isDisabled={getStatus(status) === 'Unavailable'}>Submit Feedback</Button>
                      </Link>
                    )}
                    {/* TODO: Khye chun add integration  */}
                    {status === 'Completed' && (
                      <Link to={paths.Introduction}>
                        <Button size="sm" colorScheme="red">View Feedback</Button>
                      </Link>
                    )}
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
export default QuarterlyFeedback
