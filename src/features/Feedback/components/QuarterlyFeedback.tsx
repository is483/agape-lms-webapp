import {
  Button,
  Flex,
  Table, TableContainer, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/react'
import { QuarterlyFeedback as QuarterlyFeedbackType } from '../../../app/services/feedback/type'
import { Link } from '../../../components'
import paths from '../../../paths'
import { getStatus } from '../utils'

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
            const { date, status, quarterlyFeedbackId } = feedback

            const quarterDateObject = new Date(date)
            const todayDateObject = new Date()

            const quarterDate = quarterDateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

            const dateDifference = Math.round((quarterDateObject.getTime() - todayDateObject.getTime()) / (1000 * 60 * 60 * 24))
            const formattedStatus = getStatus(status, dateDifference)
            const isUnavailable = formattedStatus === 'Unavailable'

            return (
              <Tr>
                <Td>
                  Quarter {index + 1}
                </Td>
                <Td>
                  {quarterDate}
                </Td>
                <Td textTransform="capitalize">
                  {formattedStatus}
                </Td>
                <Td>
                  {dateDifference} days
                </Td>
                <Td>
                  <Flex justify="end" gap="5">
                    {status === 'Not Completed' && (
                      <Link to={`${paths.Feedback.QuarterlyFeedbackQuestionnaire.subPath}/${quarterlyFeedbackId}`}>
                        <Button size="sm" colorScheme="red" isDisabled={isUnavailable}>Submit Feedback</Button>
                      </Link>
                    )}
                    {status === 'Completed' && (
                      <Link to={`${paths.Feedback.QuarterlyFeedbackQuestionnaire.subPath}/${quarterlyFeedbackId}`}>
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
