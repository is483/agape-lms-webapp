import {
  Box, Button, Flex, Text,
} from '@chakra-ui/react'
import { Milestone } from '../MentoringJourneys/CreateMentoringJourney/redux/types'
import { Icon } from '../../components'
import { MILESTONES } from '../MentoringJourneys/CreateMentoringJourney/redux/constants'
import GoalCard from './GoalCard'

interface MilestoneCardProps {
  milestone: Milestone
  index: number
  dateStr: string
  isEditable: boolean
}

function MilestoneCard(props: MilestoneCardProps) {
  const {
    milestone, index, dateStr, isEditable,
  } = props
  const { step, goals } = milestone

  return (
    <Box maxWidth="100%" width="360px">
      <Flex flexDir="column" gap="4" m="4" pt="4">
        <Box background="blue.600" p="2" rounded="md" shadow="sm">
          <Flex justify="space-between">
            <Text color="white" fontSize="xs" fontWeight="bold">
              Milestone {step}
            </Text>
            <Icon name="info" color="white" fontSize="xl" _hover={{ cursor: 'pointer' }} />
          </Flex>
          <Text color="white" fontSize="sm">
            {MILESTONES[index].title}
          </Text>
          <Text color="white" fontSize="xs">
            <Icon name="calendar_today" color="white" fontSize="16px" top="3px" position="relative" me="1" />
            {dateStr}
          </Text>
        </Box>
        {goals.map((goal, index) => (<GoalCard goal={goal} index={index} isEditable={isEditable} />))}
        <Button size="xs" variant="ghost" color="gray.500" w="min-content">+ New Goal</Button>
      </Flex>
    </Box>
  )
}

export default MilestoneCard
