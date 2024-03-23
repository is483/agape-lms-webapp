import {
  Button,
  Flex,
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,
  Image,
  useToast,
} from '@chakra-ui/react'
import warningIllustration from '../../../assets/warning_illustration.png'
import { useUnAssginMenteeFromMentorMutation } from '../../../app/services/user/apiUserSlice'

interface UnAssignMenteeModalProps {
  isModalOpen: boolean
  onModalClose: () => void
  menteeId: string | number
}

function UnAssignMenteeModal(props: UnAssignMenteeModalProps) {
  const { isModalOpen, onModalClose, menteeId } = props
  const [unAssignMentee] = useUnAssginMenteeFromMentorMutation()
  const toast = useToast()
  const handleModalCancel = () => {
    onModalClose()
  }
  const handleAccept = async () => {
    if (!menteeId) return
    try {
      await unAssignMentee(menteeId).unwrap()
      toast({
        title: 'Unassigned Mentee',
        description: 'Mentee has been successfully unassigned from mentor',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      })
      handleModalCancel()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Modal isOpen={isModalOpen} onClose={onModalClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent p="4" m="4" maxHeight="90vh" overflowY="auto">
        <ModalHeader> Unassigning Mentee from Mentor</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to remove this mentee from the current assigned mentor? Please note that this action is irreversible
          <Flex flexDirection="column" flex="1" justifyContent="center" alignItems="center">
            <Image src={warningIllustration} width="350px" />
          </Flex>
          <Flex gap="4" justify="flex-end" mt="8">
            <Button colorScheme="red" size="sm" variant="outline" onClick={handleModalCancel}>Cancel</Button>
            <Button colorScheme="red" size="sm" onClick={handleAccept}> Confirm </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default UnAssignMenteeModal
