import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table, TableContainer, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { AllQuarterlyFeedbackByMentoringJourney, QuarterlyFeedback as QuarterlyFeedbackType } from '../../../app/services/feedback/type'
import { Icon, Link } from '../../../components'
import paths from '../../../paths'
import { getStatus } from '../utils'
import { getAuth } from '../../../app/redux/selectors'
import { useAppSelector } from '../../../hooks'

interface QuarterlyFeedbackProps {
  data: QuarterlyFeedbackType[] & AllQuarterlyFeedbackByMentoringJourney[] | undefined
}

function QuarterlyFeedback(props: QuarterlyFeedbackProps) {
  const { mentoringJourneyId } = useParams()
  const { data } = props
  const { role } = useAppSelector(getAuth)

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
          {data?.map((feedback: QuarterlyFeedbackType & AllQuarterlyFeedbackByMentoringJourney, index) => {
            const { date, status, quarterlyFeedbackId } = feedback

            const quarterDateObject = new Date(date)
            const todayDateObject = new Date()

            const quarterDate = quarterDateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

            const dateDifference = Math.round((quarterDateObject.getTime() - todayDateObject.getTime()) / (1000 * 60 * 60 * 24))
            const formattedStatus = getStatus(status, dateDifference)
            // TODO: Add this back in after testing
            // const isUnavailable = formattedStatus === 'Unavailable'

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
                    {(role === 'Mentor' || 'Mentee') && status === 'Not Completed' && (
                      <Link to={`${paths.Feedback.QuarterlyFeedbackQuestionnaire.subPath}/${quarterlyFeedbackId}`}>
                        {/* TODO: Add this back in after testing */}
                        {/* isDisabled={isUnavailable} */}
                        <Button size="sm" colorScheme="red">Submit Feedback</Button>
                      </Link>
                    )}
                    {(role === 'Mentor' || 'Mentee') && status === 'Completed' && (
                      <Link to={`${paths.Feedback.QuarterlyFeedbackQuestionnaire.subPath}/${quarterlyFeedbackId}`}>
                        <Button size="sm" colorScheme="red">View Feedback</Button>
                      </Link>
                    )}
                    {(role === 'Admin') && (
                      <Menu>
                        {({ isOpen }) => (
                          <>
                            <MenuButton
                              isActive={isOpen}
                              as={Button}
                              colorScheme="red"
                              rightIcon={<Icon name={isOpen ? 'expand_less' : 'expand_more'} color="white" />}
                              size="sm"
                            >
                              View Feedback
                            </MenuButton>
                            <MenuList>
                              {/* // TODO: question
                        we need to validate if mentor and mentee feedback is done first right?
                        If its not done we can either disable the menu item or when they click inside the feedback, it should mention not done */}
                              {/* mentoring-journey/:mentoringJourneyId/feedback/quarterly/:quarterFeedbackId */}
                              {/* mentoring-journey/${feedback.mentoringJourneyId}/feedback/quarterly/${feedback.mentorFeedbackId} */}
                              <Link to={`/mentoring-journey/${mentoringJourneyId}/feedback/${index + 1}/quarterly/${feedback.mentorFeedbackId}`}><MenuItem>View Mentor Feedback</MenuItem></Link>
                              <Link to={`/mentoring-journey/${mentoringJourneyId}/feedback/${index + 1}/quarterly/${feedback.menteeFeedbackId} `}><MenuItem>View Mentee Feedback</MenuItem></Link>
                            </MenuList>
                          </>
                        )}
                      </Menu>
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
