import { useParams } from 'react-router-dom'
import {
  Box, Flex, HStack, Text,
} from '@chakra-ui/react'
import { Container, ProfileIcon } from '../../../../components'
import QuestionList from '../../components/QuestionList'
import { MENTOR_QUARTERLY_QUESTIONS } from '../../constants'
import { useGetMentorQuarterlyFeedbackQuery } from '../../../../app/services/feedback/apiFeedbackSlice'
import { SectionWithAnswers } from '../../components/types'
import { useGetMentoringJourneyOverviewQuery } from '../../../../app/services/mentoringJourney/apiMentoringJourneySlice'

function MentorQuarterlyFeedbackQuestionnaire() {
  const { quarterFeedbackId, mentoringJourneyId, quarter } = useParams()
  const { data: feedbackData } = useGetMentorQuarterlyFeedbackQuery(quarterFeedbackId!)
  const { data: mentoringJourneyData } = useGetMentoringJourneyOverviewQuery(mentoringJourneyId!)
  const feedbackAnswers = JSON.parse(feedbackData?.feedbackAnswers ?? '{}') as SectionWithAnswers

  return (
    <>
      <Container mb="4">
        <Text fontSize="lg" fontWeight="bold">{feedbackData?.role === 'mentor' ? 'Mentor Feedback -' : 'Mentee Feedback -'} {mentoringJourneyData?.title}</Text>
        <Text fontSize="md" fontWeight="semi-bold">Quarter {quarter} Feedback answers</Text>
        <Flex gap="4" flexWrap="wrap" mt="8">
          <Box>
            <Text fontWeight="600" fontSize="lg">Mentee</Text>
            <Flex mt="2">
              <Box padding="6" border="solid 1px" borderRadius="md" borderColor="secondary.50" display="flex" alignItems="center" gap="2">
                <HStack spacing="4">
                  <ProfileIcon imgUrl={mentoringJourneyData?.mentee?.profileImgUrl} width="55px" height="55px" iconProps={{ fontSize: '30px' }} />
                  <Text fontSize="lg">{mentoringJourneyData?.mentee?.firstName} {mentoringJourneyData?.mentee?.lastName}</Text>
                </HStack>
              </Box>
            </Flex>
          </Box>
          <Box>
            <Text fontWeight="600" fontSize="lg">Mentor</Text>
            <Flex mt="2">
              <Box padding="6" border="solid 1px" borderRadius="md" borderColor="secondary.50" display="flex" alignItems="center" gap="2">
                <HStack spacing="4">
                  <ProfileIcon imgUrl={mentoringJourneyData?.mentor?.profileImgUrl} width="55px" height="55px" iconProps={{ fontSize: '30px' }} />
                  <Text fontSize="lg">{mentoringJourneyData?.mentor?.firstName} {mentoringJourneyData?.mentor?.lastName}</Text>
                </HStack>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Container>
      <Container>
        <QuestionList
          isView={!!feedbackData?.feedbackAnswers}
          sections={MENTOR_QUARTERLY_QUESTIONS}
          sectionsWithAnswers={feedbackAnswers}
          onSubmit={() => 0}
        />
      </Container>
    </>
  )
}

export default MentorQuarterlyFeedbackQuestionnaire
