import {
  Box,
  Button, Divider, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea,
} from '@chakra-ui/react'
import { ControlledTextInput } from '../../../components'

interface CreateSessionModalProps {
  isModalOpen: boolean
  onModalClose: () => void
}

function CreateSessionModal(props: CreateSessionModalProps) {
  const { isModalOpen, onModalClose } = props
  const handleModalCancel = () => {
    onModalClose()
  }

  return (

    <Modal isOpen={isModalOpen} onClose={onModalClose} size="3xl">
      <ModalOverlay />
      <ModalContent p="4" m="4" maxHeight="90vh">
        <ModalHeader>Create Mentoring Session</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" mt="12" gap="8">
            <ControlledTextInput
              label="Title"
              type="text"
              error=""
            />
            <Box>
              <Text marginBottom="2"> Description </Text>
              <Textarea placeholder="Include your meeting agenda here..." />
            </Box>
            <Divider orientation="horizontal" />
            <Text fontWeight="600" fontSize="md"> Meeting Details</Text>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleModalCancel} mr={3}>
            Close
          </Button>
          <Button colorScheme="red">Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default CreateSessionModal
