import {
  Box, BoxProps, Button, Flex, Text,
} from '@chakra-ui/react'
import { Milestone } from '../MentoringJourneys/CreateMentoringJourney/redux/types'
import { Icon } from '../../components'
import { MILESTONES } from '../MentoringJourneys/CreateMentoringJourney/redux/constants'
import GoalCard from './GoalCard'

interface MilestoneCardProps extends BoxProps {
  milestone: Milestone
  milestoneIndex: number
  cardColor: string
  dateStr: string
  isEditable: boolean
  isCreated: boolean
  handleOpenInfoModal: (index: number) => void
  handleOpenFormModal: (milestoneIndex: number, goalIndex?: number, minDeadlineDate?: Date, maxDeadlineDate?: Date) => void
  minDeadlineDate: Date
  maxDeadlineDate: Date
}

function MilestoneCard(props: MilestoneCardProps) {
  const {
    milestone, milestoneIndex, dateStr, isEditable, isCreated,
    handleOpenInfoModal, handleOpenFormModal, cardColor,
    minDeadlineDate, maxDeadlineDate, ...boxProps
  } = props
  const {
    milestoneStep, goals, startDate, endDate,
  } = milestone

  return (
    <Box maxWidth="100%" width="360px" {...boxProps}>
      <Flex flexDir="column" gap="4" m="4" pt="4">
        <Box background={cardColor} p="2" rounded="md" shadow="sm">
          <Flex justify="space-between">
            <Text color="white" fontSize="xs" fontWeight="bold">
              Milestone {milestoneStep}
            </Text>
            <Icon onClick={() => handleOpenInfoModal(milestoneIndex)} name="info" color="white" fontSize="lg" _hover={{ cursor: 'pointer' }} />
          </Flex>
          <Text color="white" fontSize="sm">
            {MILESTONES[milestoneIndex].title}
          </Text>
          <Text color="white" fontSize="xs">
            <Icon name="calendar_today" color="white" fontSize="16px" top="3px" position="relative" me="1" />
            {dateStr}
          </Text>
        </Box>
        {goals.map((goal, goalIndex) => (
          <GoalCard
            goal={goal}
            goalIndex={goalIndex}
            milestoneIndex={milestoneIndex}
            isEditable={isEditable}
            handleOpenFormModal={handleOpenFormModal}
            isCreated={isCreated}
            startDate={startDate}
            endDate={endDate}
            minDeadlineDate={minDeadlineDate}
            maxDeadlineDate={maxDeadlineDate}
          />
        ))}
        {isEditable && (
          <Button onClick={() => handleOpenFormModal(milestoneIndex, undefined, minDeadlineDate, maxDeadlineDate)} size="xs" variant="ghost" color="gray.500" w="min-content">
            + New Goal
          </Button>
        )}
      </Flex>
    </Box>
  )
}

export default MilestoneCard
