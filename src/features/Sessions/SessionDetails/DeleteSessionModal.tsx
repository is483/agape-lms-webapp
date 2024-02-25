import {
  Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Image, useToast,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import warningIllustration from '../../../assets/warning_illustration.png'
import { useDeleteSessionMutation } from '../../../app/services/session/apiSessionSlice'
import paths from '../../../paths'

interface DeleteSessionModalProps {
  isModalOpen: boolean
  onModalClose: () => void
  sessionId: number | string | undefined
}

function DeleteSessionModal(props: DeleteSessionModalProps) {
  const { isModalOpen, onModalClose, sessionId } = props
  const navigate = useNavigate()
  const [deleteSession, { isLoading }] = useDeleteSessionMutation()
  const toast = useToast()

  const handleModalCancel = () => {
    onModalClose()
  }
  const handleAccept = async () => {
    if (!sessionId) return
    try {
      await deleteSession(sessionId).unwrap()
      toast({
        title: 'Delete Session',
        description: 'Session has been successfully deleted!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      })
      navigate(paths.Sessions.ViewAll)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Modal isOpen={isModalOpen} onClose={onModalClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent p="4" m="4" maxHeight="90vh" overflowY="auto">
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
