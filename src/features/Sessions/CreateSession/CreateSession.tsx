import {
  Box,
  Button, Divider, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Text, Textarea,
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
      <ModalContent p="4" m="4" maxHeight="90vh" overflowY="auto">
        <ModalHeader>Create Mentoring Session</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" mt="6" gap="8">
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
            <Box marginBottom="3">
              <Stack direction={['column', 'column', 'row']}>
                <Box>
                  <Text marginBottom="1">Start Date & Time</Text>
                  <Input
                    size="md"
                    type="datetime-local"
                  />
                </Box>
                <Box>
                  <Text marginBottom="1">End Date & Time</Text>
                  <Input
                    size="md"
                    type="datetime-local"
                  />
                </Box>
              </Stack>
            </Box>
            <Flex dir="row" alignContent="center" gap="5" marginBottom="8">
              <Text fontSize="md">Location: </Text>
              <RadioGroup>
                <Stack direction="row">
                  <Radio value="online">Online</Radio>
                  <Radio value="physical">Physical</Radio>
                </Stack>
              </RadioGroup>
            </Flex>
            <ControlledTextInput
              label="Meeting Link"
              type="text"
              error=""
            />
          </Flex>
          <Flex gap="4" justify="flex-end" mt="8">
            <Button colorScheme="red" size="sm" variant="outline" onClick={handleModalCancel}>Cancel</Button>
            <Button colorScheme="red" size="sm"> Save</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default CreateSessionModal
