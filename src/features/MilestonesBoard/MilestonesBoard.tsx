import {
  Box, useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Milestone } from '../MentoringJourneys/CreateMentoringJourney/redux/types'
import MilestoneCard from './MilestoneCard'
import { GoalFormModal, MilestoneInfoModal } from './Modals'

interface MilestonesBoardProps {
  data: Milestone[]
  startDate: string
  isEditable: boolean
}

const formatDate = (date: Date) => date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

function MilestonesBoard(props: MilestonesBoardProps) {
  const { data, startDate, isEditable } = props
  const { isOpen: isInfoModalOpen, onOpen: onInfoModalOpen, onClose: onInfoModalClose } = useDisclosure()
  const { isOpen: isGoalModalOpen, onOpen: onGoalModalOpen, onClose: onGoalModalClose } = useDisclosure()
  const [milestoneIndex, setMilestoneIndex] = useState(0)

  const handleOpenInfoModal = (index: number) => {
    setMilestoneIndex(index)
    onInfoModalOpen()
  }

  const handleOpenFormModal = (index: number) => {
    setMilestoneIndex(index)
    onGoalModalOpen()
  }

  return (
    <Box background="blue.50" rounded="md" minHeight="60vh">
      <MilestoneInfoModal isModalOpen={isInfoModalOpen} onModalClose={onInfoModalClose} milestoneIndex={milestoneIndex} />
      <GoalFormModal isModalOpen={isGoalModalOpen} onModalClose={onGoalModalClose} milestoneIndex={milestoneIndex} />
      {data.map((milestone, index) => {
        // 60 days per milestone
        const fromDate = new Date(startDate)
        fromDate.setDate(fromDate.getDate() + index * 60)
        const toDate = new Date(startDate)
        toDate.setDate(toDate.getDate() + (index + 1) * 60)
        const dateStr = `${formatDate(fromDate)} - ${formatDate(toDate)} `
        return (
          <MilestoneCard
            milestone={milestone}
            index={index}
            dateStr={dateStr}
            isEditable={isEditable}
            handleOpenInfoModal={handleOpenInfoModal}
            handleOpenFormModal={handleOpenFormModal}
          />
        )
      })}
    </Box>
  )
}

export default MilestonesBoard
