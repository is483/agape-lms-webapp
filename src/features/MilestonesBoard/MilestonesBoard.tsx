import {
  Box, Flex, Modal, ModalCloseButton,
  ModalContent, ModalOverlay, Text, useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Milestone } from '../MentoringJourneys/CreateMentoringJourney/redux/types'
import MilestoneCard from './MilestoneCard'
import { Icon } from '../../components'
import { MILESTONES } from '../MentoringJourneys/CreateMentoringJourney/redux/constants'
import { useAppSelector } from '../../hooks'
import { getAuth } from '../../app/redux/selectors'

interface MilestonesBoardProps {
  data: Milestone[]
  startDate: string
  isEditable: boolean
}

const formatDate = (date: Date) => date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

function MilestonesBoard(props: MilestonesBoardProps) {
  const { data, startDate, isEditable } = props
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const [milestoneIndex, setMilestoneIndex] = useState(0)

  const handleOpenInfoModal = (index: number) => {
    setMilestoneIndex(index)
    onModalOpen()
  }

  return (
    <Box background="blue.50" rounded="md" minHeight="60vh">
      <MilestoneInfoModal isModalOpen={isModalOpen} onModalClose={onModalClose} milestoneIndex={milestoneIndex} />
      {data.map((milestone, index) => {
        // 60 days per milestone
        const fromDate = new Date(startDate)
        fromDate.setDate(fromDate.getDate() + index * 60)
        const toDate = new Date(startDate)
        toDate.setDate(toDate.getDate() + (index + 1) * 60)
        const dateStr = `${formatDate(fromDate)} - ${formatDate(toDate)} `
        return (
          <MilestoneCard milestone={milestone} index={index} dateStr={dateStr} isEditable={isEditable} handleOpenInfoModal={handleOpenInfoModal} />
        )
      })}
    </Box>
  )
}

interface MilestoneInfoModalProps {
  isModalOpen: boolean
  onModalClose: () => void
  milestoneIndex: number
}

function MilestoneInfoModal(props: MilestoneInfoModalProps) {
  const { isModalOpen, onModalClose, milestoneIndex } = props
  const { role } = useAppSelector(getAuth)
  const {
    title, goal, duration, success,
  } = MILESTONES[milestoneIndex]
  const successText = role === 'Mentor' ? success.mentor : success.mentee
  const step = milestoneIndex + 1

  return (
    <Modal isOpen={isModalOpen} onClose={onModalClose} isCentered>
      <ModalOverlay />
      <ModalContent p="4" m="4">
        <Text textTransform="uppercase" fontWeight="600" fontSize="sm">Milestone {step}</Text>
        <ModalCloseButton />
        <Text my="1" fontWeight="600" color="red.700" fontSize="xl">{title}</Text>
        <Flex align="center" gap="1" mb="4">
          <Icon name="calendar_today" color="gray.600" fontSize="20" />
          <Text fontSize="xs" color="gray.600">Expected Deadline: {duration}</Text>
        </Flex>
        <Text my="2" fontWeight="700" fontSize="sm">What to expect?</Text>
        <Text color="gray.600">{goal}</Text>
        <Text mt="6" mb="2" fontWeight="700" fontSize="sm">What does success look like? </Text>
        <Text color="gray.600">{successText}</Text>
      </ModalContent>
    </Modal>
  )
}

export default MilestonesBoard
