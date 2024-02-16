import {
  Box, Flex, Progress, Text,
} from '@chakra-ui/react'
import { MilestonesBoard } from '../../../MilestonesBoard'
import { Icon } from '../../../../components'
import { MilestonesResponse } from '../../../../app/services/mentoringJourney/types'

interface MilestonesProps {
  data: MilestonesResponse | undefined
}

function Milestones(props: MilestonesProps) {
  const { data } = props

  if (!data) return null

  const { milestones, outcome, outcomeDescription } = data
  const numAchieved = milestones.filter(({ status }) => status === 'complete').length

  return (
    <Box>
      <Flex gap="3" mb="6">
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
      <MilestonesBoard data={milestones} startDate={milestones[0]?.startDate ?? ''} isEditable={false} isCreated />
    </Box>
  )
}

export default Milestones
