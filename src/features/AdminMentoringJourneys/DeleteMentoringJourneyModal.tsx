import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Flex, Button, Image, useToast,
} from '@chakra-ui/react'
import warningIllustration from '../../assets/warning_illustration.png'

interface DeleteMentoringJourneyModalProps {
  isModalOpen: boolean
  onModalClose: () => void
  mentoringJourneyId: number | string | undefined
}

function DeleteMentoringJourneyModal(props: DeleteMentoringJourneyModalProps) {
  const {
    isModalOpen, onModalClose, mentoringJourneyId,
  } = props
  const toast = useToast()
  const handleModalCancel = () => {
    onModalClose()
  }
  const handleAccept = async () => {
    if (!mentoringJourneyId) return
    try {
      toast({
        title: 'Delete Mentoring Journey',
        description: 'Mentoring Journey has been successfully deleted!',
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
        <ModalHeader> Delete Mentoring Journey</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete this mentoring journey? Please note that this action is irreversible
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
export default DeleteMentoringJourneyModal
