import {
  Flex, Modal, ModalCloseButton,
  ModalContent, ModalOverlay, Text,
} from '@chakra-ui/react'
import { Icon } from '../../../components'
import { MILESTONES } from '../../MentoringJourneys/CreateMentoringJourney/redux/constants'
import { useAppSelector } from '../../../hooks'
import { getAuth } from '../../../app/redux/selectors'

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
          <Icon name="calendar_today" color="gray.500" fontSize="20" />
          <Text fontSize="xs" color="gray.500">Expected Deadline: {duration}</Text>
        </Flex>
        <Text my="2" fontWeight="700" fontSize="sm">What to expect?</Text>
        <Text color="gray.600">{goal}</Text>
        <Text mt="6" mb="2" fontWeight="700" fontSize="sm">What does success look like? </Text>
        <Text color="gray.600">{successText}</Text>
      </ModalContent>
    </Modal>
  )
}

export default MilestoneInfoModal
