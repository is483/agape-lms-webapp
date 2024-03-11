import {
  Box, Progress, SimpleGrid, Text, Flex,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useGetSessionMetricsQuery } from '../../../../app/services/feedback/apiFeedbackSlice'

const calculatePercentage = (count: number, total: number): number => (total > 0 ? Math.round((count / total) * 100) : 0)
interface ProgressLabelsProps {
  label: string,
  value: number,
  total: number,
}

function FeedbackMetrics() {
  const { mentoringJourneyId } = useParams()
  const { data } = useGetSessionMetricsQuery(mentoringJourneyId!)
  const mentorScores = data?.mentorSatisfactionScores
  const menteeScores = data?.menteeSatisfactionScores

  return (
    <SimpleGrid columns={[1, null, 2]} spacing="20px" mt="5">
      <Box border="solid" borderWidth="1px" borderColor="secondary.50" padding={4} rounded="md">
        <Text fontWeight="bold">Overall Satisfaction (Based on {mentorScores?.totalReviews} reviews)</Text>

        <ProgressWithLabel label="Very Satisfied" value={mentorScores?.verySatisfied ?? 0} total={mentorScores?.totalReviews ?? 0} />
        <ProgressWithLabel label="Satisfied" value={mentorScores?.Satisfied ?? 0} total={mentorScores?.totalReviews ?? 0} />
        <ProgressWithLabel label="Neutral" value={mentorScores?.Neutral ?? 0} total={mentorScores?.totalReviews ?? 0} />
        <ProgressWithLabel label="Dissatisfied" value={mentorScores?.Dissatisfied ?? 0} total={mentorScores?.totalReviews ?? 0} />
        <ProgressWithLabel label="Very Dissatisfied" value={mentorScores?.veryDissatisfied ?? 0} total={mentorScores?.totalReviews ?? 0} />
      </Box>

      <Box border="solid" borderWidth="1px" borderColor="secondary.50" padding={4} rounded="md">
        <Text fontWeight="bold">Overall Satisfaction (Based on {menteeScores?.totalReviews} reviews)</Text>

        <ProgressWithLabel label="Very Satisfied" value={menteeScores?.verySatisfied ?? 0} total={menteeScores?.totalReviews ?? 0} />
        <ProgressWithLabel label="Satisfied" value={menteeScores?.Satisfied ?? 0} total={menteeScores?.totalReviews ?? 0} />
        <ProgressWithLabel label="Neutral" value={menteeScores?.Neutral ?? 0} total={menteeScores?.totalReviews ?? 0} />
        <ProgressWithLabel label="Dissatisfied" value={menteeScores?.Dissatisfied ?? 0} total={menteeScores?.totalReviews ?? 0} />
        <ProgressWithLabel label="Very Dissatisfied" value={menteeScores?.veryDissatisfied ?? 0} total={menteeScores?.totalReviews ?? 0} />
      </Box>
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
