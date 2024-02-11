import {
  Modal, ModalBody, ModalCloseButton, ModalOverlay, ModalHeader, ModalContent, Flex, Button, Image, useToast,
} from '@chakra-ui/react'
import acceptSession from '../../../assets/accept_session.png'
import { useAcceptSessionMutation } from '../../../app/services/session/apiSessionSlice'

interface AcceptSessionModalProps {
  isModalOpen: boolean
  onModalClose: () => void
  sessionId: number | string
}

function AcceptSessionModal(props: AcceptSessionModalProps) {
  const { isModalOpen, onModalClose, sessionId } = props
  const [acceptSessionMutation, { isLoading }] = useAcceptSessionMutation()
  const toast = useToast()

  const handleModalCancel = () => {
    onModalClose()
  }

  const handleAccept = () => {
    try {
      acceptSessionMutation(sessionId).unwrap()
      toast({
        title: 'Accept Session',
        description: 'You may now view your accepted session under Upcoming Sessions',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      })
      onModalClose()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Modal isOpen={isModalOpen} onClose={onModalClose} size="2xl">
      <ModalOverlay />
      <ModalContent p="4" m="4" maxHeight="70vh">
        <ModalHeader> Accept Mentoring Session</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          By performing this session, you would be confirming your attendance for the upcoming mentoring session. Do you want to proceed?

          <Flex flexDirection="column" flex="1" justifyContent="center" alignItems="center">
            <Image src={acceptSession} width="350px" />
          </Flex>
          <Flex gap="4" justify="flex-end" mt="8">
            <Button colorScheme="red" size="sm" variant="outline" onClick={handleModalCancel}>Cancel</Button>
            <Button colorScheme="red" size="sm" onClick={handleAccept} isLoading={isLoading}> Accept </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default AcceptSessionModal
