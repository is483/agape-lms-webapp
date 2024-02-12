import {
  Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Image,
} from '@chakra-ui/react'
import warningIllustration from '../../../assets/warning_illustration.png'
import { useDeleteSessionMutation } from '../../../app/services/session/apiSessionSlice'

interface DeleteSessionModalProps {
  isModalOpen: boolean
  onModalClose: () => void
}

function DeleteSessionModal(props: DeleteSessionModalProps) {
  const { isModalOpen, onModalClose } = props
  const [deleteSession, { isLoading }] = useDeleteSessionMutation()

  const handleModalCancel = () => {
    onModalClose()
  }
  const handleAccept = () => {

  }

  return (
    <Modal isOpen={isModalOpen} onClose={onModalClose} size="2xl">
      <ModalOverlay />
      <ModalContent p="4" m="4" maxHeight="70vh">
        <ModalHeader> Delete Mentoring Session</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete this upcoming session? Please note that this action is irreversible
          <Flex flexDirection="column" flex="1" justifyContent="center" alignItems="center">
            <Image src={warningIllustration} width="350px" />
          </Flex>
          <Flex gap="4" justify="flex-end" mt="8">
            <Button colorScheme="red" size="sm" variant="outline" onClick={handleModalCancel}>Cancel</Button>
            <Button colorScheme="red" size="sm" onClick={handleAccept} isLoading={isLoading}> Confirm </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default DeleteSessionModal
