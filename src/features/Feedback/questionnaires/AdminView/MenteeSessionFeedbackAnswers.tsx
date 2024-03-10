import { useParams } from 'react-router-dom'
import { Flex, HStack, Text } from '@chakra-ui/react'
import { useGetMenteeSessionFeedbackQuery } from '../../../../app/services/feedback/apiFeedbackSlice'
import { Container, Icon } from '../../../../components'
import QuestionList from '../../components/QuestionList'
import { MENTOR_SESSION_QUESTIONS } from '../../constants'
import { SectionWithAnswers } from '../../components/types'
import { useGetSessionDetailsMentorQuery } from '../../../../app/services/session/apiSessionSlice'
import { getSessionDuration } from '../../../../utils'

function MenteeSessionFeedbackAnswers() {
  const { sessionId } = useParams()
  const { data: feedbackData } = useGetMenteeSessionFeedbackQuery(sessionId!)
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
      {/* TODO: Add session details */}
      <Container mb="4">
        <Text fontSize="lg" fontWeight="bold">{sessionData?.sessionDetails.title}</Text>
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

export default MenteeSessionFeedbackAnswers
