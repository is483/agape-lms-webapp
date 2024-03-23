import {
  Button,
  Flex,
  Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack, Text, Menu, MenuButton, MenuItem, MenuList,
} from '@chakra-ui/react'
import { AllSessionFeedbackByMentoringJourney, SessionFeedback as SessionFeedbackType } from '../../../app/services/feedback/type'
import paths from '../../../paths'
import { Icon, Link } from '../../../components'
import { getAuth } from '../../../app/redux/selectors'
import { useAppSelector } from '../../../hooks'

interface SessionFeedbackProps {
  data: SessionFeedbackType[] & AllSessionFeedbackByMentoringJourney[] | undefined
}

function SessionFeedback(props: SessionFeedbackProps) {
  const { data } = props
  const { role } = useAppSelector(getAuth)

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
        <Tbody>
          {data?.length === 0 && (
          <Tr>
            <Td colSpan={5}>
              <Flex height="40px" justify="center" align="center">
                Session feedback will only be visible once a session has been completed
              </Flex>
            </Td>
          </Tr>
          )}
          {data?.map((session: SessionFeedbackType & AllSessionFeedbackByMentoringJourney) => {
            const {
              fromDateTime, toDateTime, title, sessionType,
              sessionId, status,
            } = session

            const fromDateObject = new Date(fromDateTime)
            const fromDate = fromDateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            const fromTime = fromDateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

            const toDateObject = new Date(toDateTime)
            const toDate = toDateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            const toTime = toDateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
            return (
              <Tr>
                <Td>
                  <VStack alignItems="start">
                    <Text color="primary.800" fontSize="sm"> {fromDate === toDate ? fromDate : `${fromDate} - ${toDate}`}</Text>
                    <Text> {`${fromTime} to ${toTime}`}</Text>
                  </VStack>
                </Td>
                <Td>
                  {title}
                </Td>
                <Td textTransform="capitalize">
                  {sessionType}
                </Td>
                <Td>
                  <Flex justify="end" gap="3" alignItems="center">
                    {(role === 'Mentor' || 'Mentee') && status === 'Not Completed' && (
                      <Link to={`${paths.Feedback.SessionFeedbackQuestionnaire.subPath}/${sessionId}`}>
                        <Button size="sm" colorScheme="red">Rate Session</Button>
                      </Link>
                    )}
                    {(role === 'Mentor' || 'Mentee') && status === 'Completed' && (
                      <Link to={`${paths.Feedback.SessionFeedbackQuestionnaire.subPath}/${sessionId}`}>
                        <Button size="sm" colorScheme="red">View Feedback</Button>
                      </Link>
                    )}
                    {role === 'Admin' && (
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
                              {/* // QUESTION:
                          we need to validate if mentor and mentee feedback is done first right?
                          If its not done we can either disable the menu item or when they click inside the feedback, it should mention not done */}
                              <Link to={`/feedback/mentor/${sessionId}`}><MenuItem>View Mentor Feedback</MenuItem></Link>
                              <Link to={`/feedback/mentee/${sessionId}`}><MenuItem>View Mentee Feedback</MenuItem></Link>
                            </MenuList>
                          </>
                        )}
                      </Menu>
                    )}
                    <Link to={`${paths.Sessions.Details.subPath}/${sessionId}`}>
                      <Button size="sm" colorScheme="red" variant="outline">Session Details</Button>
                    </Link>
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
export default SessionFeedback
