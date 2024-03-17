import { useParams } from 'react-router-dom'
import {
  Box, Divider, Flex, HStack, Text,
} from '@chakra-ui/react'
import { useGetMentorSessionFeedbackQuery } from '../../../../app/services/feedback/apiFeedbackSlice'
import {
  BackButton, Container, Icon, ProfileIcon,
} from '../../../../components'
import QuestionList from '../../components/QuestionList'
import { MENTOR_SESSION_QUESTIONS } from '../../constants'
import { SectionWithAnswers } from '../../components/types'
import { useGetSessionDetailsMentorQuery } from '../../../../app/services/session/apiSessionSlice'
import { getSessionDuration } from '../../../../utils'

function MentorSessionFeedbackAnswers() {
  const { sessionId } = useParams()
  const { data: feedbackData } = useGetMentorSessionFeedbackQuery(sessionId!)
  const { data: sessionData } = useGetSessionDetailsMentorQuery(sessionId!)

  const feedbackAnswers = JSON.parse(feedbackData?.feedbackAnswers ?? '{}') as SectionWithAnswers

  const startDateObject = new Date(sessionData?.sessionDetails.fromDateTime as string)
  const startDate = startDateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const startTime = startDateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

  const endDateObject = new Date(sessionData?.sessionDetails.toDateTime as string)
  const endDate = endDateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const endTime = endDateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

  return (
    <>
      <Container mb="4">
        <BackButton />
        <Divider my="4" />
        <Text fontSize="lg" fontWeight="600">Mentor feedback - {sessionData?.sessionDetails.title}</Text>
        <Flex gap={['3', '3', '10']} flexDir={['column', 'column', 'row']} mt={['5', '5', '2']}>
          <HStack>
            <Icon name="calendar_today" fontSize="25px" />
            <Text color="secondary.500">{startDate === endDate ? startDate : `${startDate} - ${endDate}`}</Text>
          </HStack>

          <HStack>
            <Icon name="schedule" fontSize="25px" />
            <Text color="secondary.500">{startTime} - {endTime}</Text>
          </HStack>

          <HStack>
            <Icon name="hourglass_top" fontSize="25px" />
            <Text color="secondary.500"> {getSessionDuration(startDateObject, endDateObject)}</Text>
          </HStack>
        </Flex>
        <Flex gap="4" flexWrap="wrap" mt="8">
          <Box>
            <Text fontWeight="600" fontSize="lg">Mentee</Text>
            <Flex mt="2">
              <Box padding="6" border="solid 1px" borderRadius="md" borderColor="secondary.50" display="flex" alignItems="center" gap="2">
                <HStack spacing="4">
                  <ProfileIcon imgUrl={sessionData?.mentee?.profileImgUrl} width="55px" height="55px" iconProps={{ fontSize: '30px' }} />
                  <Text fontSize="lg">{sessionData?.mentee?.firstName} {sessionData?.mentee?.lastName}</Text>
                </HStack>
              </Box>
            </Flex>
          </Box>
          <Box>
            <Text fontWeight="600" fontSize="lg">Mentor</Text>
            <Flex mt="2">
              <Box padding="6" border="solid 1px" borderRadius="md" borderColor="secondary.50" display="flex" alignItems="center" gap="2">
                <HStack spacing="4">
                  <ProfileIcon imgUrl={sessionData?.mentor?.profileImgUrl} width="55px" height="55px" iconProps={{ fontSize: '30px' }} />
                  <Text fontSize="lg">{sessionData?.mentor?.firstName} {sessionData?.mentor?.lastName}</Text>
                </HStack>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Container>
      <Container minHeight="calc(100vh - 32px)">
        <QuestionList
          isView={!!feedbackData?.feedbackAnswers}
          sections={MENTOR_SESSION_QUESTIONS}
          sectionsWithAnswers={feedbackAnswers}
          onSubmit={() => 0}
        />
      </Container>
    </>
  )
}

export default MentorSessionFeedbackAnswers
