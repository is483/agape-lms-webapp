import {
  Box, useDisclosure,
} from '@chakra-ui/react'
import { Milestone } from '../MentoringJourneys/CreateMentoringJourney/redux/types'
import MilestoneCard from './MilestoneCard'
import { GoalFormModal, MilestoneInfoModal } from './Modals'
import { useAppDispatch } from '../../hooks'
import { setGoalIndex, setMilestoneIndex } from '../MentoringJourneys/CreateMentoringJourney/redux/mentoringJourneyFormSlice'
import { formatDate } from '../../utils'

interface MilestonesBoardProps {
  data: Milestone[]
  startDate: string
  isEditable: boolean
  isCreated: boolean
}

const colors = ['blue.600', 'green.600', 'yellow.600', 'orange.600', 'red.600', 'purple.600']

function MilestonesBoard(props: MilestonesBoardProps) {
  const {
    data, startDate, isEditable, isCreated,
  } = props
  const { isOpen: isInfoModalOpen, onOpen: onInfoModalOpen, onClose: onInfoModalClose } = useDisclosure()
  const { isOpen: isGoalModalOpen, onOpen: onGoalModalOpen, onClose: onGoalModalClose } = useDisclosure()
  const dispatch = useAppDispatch()

  const handleOpenInfoModal = (index: number) => {
    dispatch(setMilestoneIndex(index))
    onInfoModalOpen()
  }

  const handleOpenFormModal = (milestoneIndex: number, goalIndex?: number) => {
    dispatch(setMilestoneIndex(milestoneIndex))
    dispatch(setGoalIndex(goalIndex))
    onGoalModalOpen()
  }

  return (
    <Box background="blue.50" rounded="md" height="65vh" overflow="scroll" position="relative">
      <MilestoneInfoModal isModalOpen={isInfoModalOpen} onModalClose={onInfoModalClose} />
      <GoalFormModal isModalOpen={isGoalModalOpen} onModalClose={onGoalModalClose} />
      {data.map((milestone, index) => {
        // 60 days per milestone
        const fromDate = new Date(startDate)
        fromDate.setDate(fromDate.getDate() + index * 60)
        const toDate = new Date(startDate)
        toDate.setDate(toDate.getDate() + (index + 1) * 60)
        const dateStr = `${formatDate(fromDate)} - ${formatDate(toDate)} `
        return (
          <MilestoneCard
            cardColor={colors[index]}
            display={['block', null, 'inline-block']}
            milestone={milestone}
            milestoneIndex={index}
            dateStr={dateStr}
            isEditable={isEditable}
            handleOpenInfoModal={handleOpenInfoModal}
            handleOpenFormModal={handleOpenFormModal}
            isCreated={isCreated}
          />
        )
      })}
    </Box>
  )
}

export default MilestonesBoard
