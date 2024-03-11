import {
  Box, Progress, SimpleGrid, Text, Flex, Circle, Badge,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useGetSessionMetricsQuery } from '../../../../app/services/feedback/apiFeedbackSlice'
import { Icon } from '../../../../components'
import { SessionMetricsResponse } from '../../../../app/services/feedback/type'

interface ProgressLabelsProps {
  label: string,
  value: number,
  total: number,
}
const calculatePercentage = (count: number, total: number): number => (total > 0 ? Math.round((count / total) * 100) : 0)

const getBadgeDetails = (data: SessionMetricsResponse, role: string) => {
  if (!data) return { label: 'No Ratings', colorScheme: 'gray' }
  const scores = role === 'Mentor' ? data?.mentorSatisfactionScores : data?.menteeSatisfactionScores

  const satisfactionLevels = [
    { label: 'Very Satisfied', value: scores.verySatisfied ?? 0, colorScheme: 'green' },
    { label: 'Satisfied', value: scores.Satisfied ?? 0, colorScheme: 'green' },
    { label: 'Neutral', value: scores.Neutral ?? 0, colorScheme: 'gray' },
    { label: 'Dissatisfied', value: scores.Dissatisfied ?? 0, colorScheme: 'yellow' },
    { label: 'Very Dissatisfied', value: scores.veryDissatisfied ?? 0, colorScheme: 'yellow' },
  ]
  const highestRating = satisfactionLevels.reduce((prev, current) => (prev.value > current.value ? prev : current), satisfactionLevels[0])
  return { label: highestRating.label, colorScheme: highestRating.colorScheme }
}
function FeedbackMetrics() {
  const { mentoringJourneyId } = useParams()
  const { data } = useGetSessionMetricsQuery(mentoringJourneyId!)
  const mentorScores = data?.mentorSatisfactionScores
  const menteeScores = data?.menteeSatisfactionScores

  return (
    <SimpleGrid columns={[1, null, 2]} spacing="20px" mt="5">
      <Flex border="solid" borderWidth="1px" borderColor="secondary.50" padding={4} rounded="md" flexDir="column">
        <Box mb="2">
          <Circle size="45px" bg="red.100">
            <Icon color="red.700" fontSize="2xl" name="supervisor_account" />
          </Circle>
        </Box>
        <Text fontWeight="bold" mb="2">Mentor&apos;s Overall Satisfaction (Based on {mentorScores?.totalReviews} reviews)</Text>
        <Box display="inline-flex">
          <Badge colorScheme={getBadgeDetails(data!, 'Mentor').colorScheme} mb="4" p="1">{getBadgeDetails(data!, 'Mentor').label}</Badge>
        </Box>
        <ProgressWithLabel label="Very Satisfied" value={mentorScores?.verySatisfied ?? 0} total={mentorScores?.totalReviews ?? 0} />
        <ProgressWithLabel label="Satisfied" value={mentorScores?.Satisfied ?? 0} total={mentorScores?.totalReviews ?? 0} />
        <ProgressWithLabel label="Neutral" value={mentorScores?.Neutral ?? 0} total={mentorScores?.totalReviews ?? 0} />
        <ProgressWithLabel label="Dissatisfied" value={mentorScores?.Dissatisfied ?? 0} total={mentorScores?.totalReviews ?? 0} />
        <ProgressWithLabel label="Very Dissatisfied" value={mentorScores?.veryDissatisfied ?? 0} total={mentorScores?.totalReviews ?? 0} />
      </Flex>

      <Flex border="solid" borderWidth="1px" borderColor="secondary.50" padding={4} rounded="md" flexDir="column">
        <Box mb="2">
          <Circle size="45px" bg="red.100">
            <Icon color="red.700" fontSize="2xl" name="person" />
          </Circle>
        </Box>
        <Text fontWeight="bold" mb="2">Mentee&apos;s Overall Satisfaction (Based on {menteeScores?.totalReviews} reviews)</Text>
        <Box display="inline-flex">
          <Badge colorScheme={getBadgeDetails(data!, 'Mentee').colorScheme} mb="4" p="1">{getBadgeDetails(data!, 'Mentee').label}</Badge>
        </Box>
        <ProgressWithLabel label="Very Satisfied" value={menteeScores?.verySatisfied ?? 0} total={menteeScores?.totalReviews ?? 0} />
        <ProgressWithLabel label="Satisfied" value={menteeScores?.Satisfied ?? 0} total={menteeScores?.totalReviews ?? 0} />
        <ProgressWithLabel label="Neutral" value={menteeScores?.Neutral ?? 0} total={menteeScores?.totalReviews ?? 0} />
        <ProgressWithLabel label="Dissatisfied" value={menteeScores?.Dissatisfied ?? 0} total={menteeScores?.totalReviews ?? 0} />
        <ProgressWithLabel label="Very Dissatisfied" value={menteeScores?.veryDissatisfied ?? 0} total={menteeScores?.totalReviews ?? 0} />
      </Flex>
    </SimpleGrid>
  )
}

function ProgressWithLabel(props: ProgressLabelsProps) {
  const { label, value, total } = props
  const percentage = calculatePercentage(value, total)
  return (
    <Flex alignItems="center" justifyContent="space-between" mt={2}>
      <Text width="30%" isTruncated>{label}</Text>
      <Progress colorScheme="red" rounded="md" value={percentage} width="70%" />
      <Text minW="50px" textAlign="right">{percentage}%</Text>
    </Flex>
  )
}

export default FeedbackMetrics
