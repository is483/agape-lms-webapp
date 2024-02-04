import { useParams } from 'react-router-dom'
import {
  Box, Flex, Progress, Text,
} from '@chakra-ui/react'
import { useGetMilestonesQuery } from '../../../app/services/mentoringJourney/apiMentoringJourneySlice'
import { MilestonesBoard } from '../../MilestonesBoard'
import { Icon } from '../../../components'

function Milestones() {
  const { mentoringJourneyId } = useParams()
  const { data } = useGetMilestonesQuery(mentoringJourneyId!)

  if (!data) return null

  const { milestones, outcome, outcomeDescription } = data
  const numAchieved = milestones.filter(({ status }) => status === 'complete').length

  return (
    <Box>
      <Flex gap="3" mb="4">
        <Box>
          <Icon name="flag" fontSize="32px" padding="2" backgroundColor="red.100" color="red.600" rounded="full" />
        </Box>
        <Box>
          <Text fontWeight="700" fontSize="lg">{outcome}</Text>
          <Text color="secondary.500" fontSize="sm">{outcomeDescription}</Text>
        </Box>
      </Flex>
      <Flex justify="space-between">
        <Text fontWeight="500" fontSize="sm">Milestones Achieved</Text>
        <Text fontWeight="500" fontSize="sm">{numAchieved}/6</Text>
      </Flex>
      <Progress mb="6" rounded="full" value={(numAchieved / 6) * 100} />
      <MilestonesBoard data={milestones} startDate={milestones[0]?.startDate ?? ''} isEditable={false} />
    </Box>
  )
}

export default Milestones
