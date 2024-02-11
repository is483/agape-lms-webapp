import {
  Modal, ModalBody, ModalCloseButton, ModalOverlay, ModalHeader, ModalContent, Flex, Button, Image,
} from '@chakra-ui/react'
import acceptSession from '../../../assets/accept_session.png'

interface AcceptSessionModalProps {
  isModalOpen: boolean
  onModalClose: () => void
}

function AcceptSessionModal(props: AcceptSessionModalProps) {
  const { isModalOpen, onModalClose } = props

  const handleModalCancel = () => {
    onModalClose()
  }

  const handleAccept = () => {
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
            <Button colorScheme="red" size="sm" onClick={handleAccept}> Accept </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default AcceptSessionModal
