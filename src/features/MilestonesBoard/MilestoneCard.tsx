import {
  Badge,
  Box, BoxProps, Button, Flex, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text, useDisclosure,
} from '@chakra-ui/react'
import { Milestone } from '../MentoringJourneys/CreateMentoringJourney/redux/types'
import { Icon } from '../../components'
import { MILESTONES } from '../MentoringJourneys/CreateMentoringJourney/redux/constants'
import GoalCard from './GoalCard'
import { useAppSelector } from '../../hooks'
import { getAuth } from '../../app/redux/selectors'
import { useUpdateMilestoneStatusMutation } from '../../app/services/mentoringJourney/apiMentoringJourneySlice'
import { UpdateMilestoneStatusRequest } from '../../app/services/mentoringJourney/types'

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
    status, milestoneId,
  } = milestone

  const currDatetime = new Date()
  const isOngoing = new Date(startDate ?? '') < currDatetime && new Date(endDate ?? '') > currDatetime
  const isEvaluating = new Date(endDate ?? '') < currDatetime

  return (
    <Box maxWidth="100%" width="360px" {...boxProps}>
      <Flex flexDir="column" gap="4" m="4" pt="4">
        <Box background={cardColor} p="2" rounded="md" shadow="sm">
          <Flex justify="space-between">
            <Text color="white" fontSize="xs" fontWeight="bold">
              Milestone {milestoneStep}
            </Text>
            <Flex align="center" gap="2" position="relative">
              <MilestoneStatusPopover isEvaluating={isEvaluating} milestoneId={milestoneId} status={isOngoing ? 'ongoing' : status ?? ''} />
              <Icon onClick={() => handleOpenInfoModal(milestoneIndex)} name="info" color="white" fontSize="lg" _hover={{ cursor: 'pointer' }} />
            </Flex>
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

const getStatuses = (): Record<string, { color: string, text: string }> => ({
  not_completed: {
    color: 'yellow',
    text: 'Not Completed',
  },
  failed: {
    color: 'red',
    text: 'Failed',
  },
  completed: {
    color: 'green',
    text: 'Completed',
  },
  ongoing: {
    color: 'yellow',
    text: 'Ongoing',
  },
  is_evaluating: {
    color: 'yellow',
    text: 'Under Evaluation',
  },
})

function MilestoneStatus({ status, onClick, isEvaluating }: { status: string, onClick: () => void, isEvaluating: boolean }) {
  const statuses = getStatuses()
  const { role } = useAppSelector(getAuth)
  const statusAttributes = statuses[isEvaluating && status === 'not_completed' ? 'is_evaluating' : status]
  const isEditable = role === 'Admin' && isEvaluating

  if (statusAttributes) {
    return (
      <Badge _hover={{ cursor: isEditable ? 'pointer' : 'default' }} onClick={onClick} colorScheme={statusAttributes.color} fontSize="10px">
        {statusAttributes.text}
        {isEditable && <Icon p="0" fontSize="16" top="4px" marginTop="-4px" position="relative" name="expand_more" />}
      </Badge>
    )
  }

  return null
}

function MilestoneStatusPopover({
  status, milestoneId, isEvaluating,
}: { status: string, milestoneId: number, isEvaluating: boolean }) {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const { role } = useAppSelector(getAuth)
  const [updateMilestoneStatus] = useUpdateMilestoneStatusMutation()

  const handleOpenPopover = () => (role === 'Admin' && isEvaluating ? onToggle() : null)
  const statuses = getStatuses()

  const statusesArr = Object.keys(statuses)
  statusesArr.splice(3, 2)

  const handleUpdateMilestoneStatus = (status: string) => {
    const request: UpdateMilestoneStatusRequest = {
      milestoneId,
      status,
    }

    updateMilestoneStatus(request).unwrap()
  }

  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <MilestoneStatus isEvaluating={isEvaluating} onClick={handleOpenPopover} status={status} />
      </PopoverTrigger>
      <PopoverContent mt="6">
        <PopoverHeader fontWeight="semibold" color="gray">Status Options</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody px="0">
          <Flex flexDir="column">
            {statusesArr.map((key) => (
              <Box _hover={{ backgroundColor: 'gray.200', cursor: 'pointer' }} py="1" px="2" onClick={() => handleUpdateMilestoneStatus(key)}>
                <Badge w="fit-content" _hover={{ cursor: 'pointer' }} colorScheme={statuses[key].color} fontSize="11px">{statuses[key].text}</Badge>
              </Box>
            ))}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default MilestoneCard
