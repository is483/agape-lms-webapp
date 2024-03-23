import {
  Button,
  Flex,
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,
  Image,
  useToast,
} from '@chakra-ui/react'
import warningIllustration from '../../../assets/warning_illustration.png'

interface DeleteUserModalProps {
  isModalOpen: boolean
  onModalClose: () => void
  userId: string | number
}

function DeleteUserModal(props: DeleteUserModalProps) {
  const { isModalOpen, onModalClose, userId } = props
  const toast = useToast()
  const handleModalCancel = () => {
    onModalClose()
  }
  const handleAccept = async () => {
    if (!userId) return
    try {
      // await unAssignMentee(menteeId).unwrap()
      toast({
        title: 'Delete User',
        description: 'User has been successfully deleted',
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
        <ModalHeader> Delete User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete this user? <b> Please note that this action is irreversible</b>
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
export default DeleteUserModal
