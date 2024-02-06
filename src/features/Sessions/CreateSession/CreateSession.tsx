/* eslint-disable no-param-reassign */
import {
  Box,
  Button, Divider, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Text, Textarea,
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { useImmer } from 'use-immer'
import { ControlledTextInput } from '../../../components'

interface CreateSessionModalProps {
  isModalOpen: boolean
  onModalClose: () => void
}

const defaultSession = {
  title: { value: '', error: '' },
  description: { value: '', error: '' },
  startDate: { value: '', error: '' },
  endDate: { value: '', error: '' },
  location: { value: 'online', error: '' },
  meetingLink: { value: '', error: '' },
}

function CreateSessionModal(props: CreateSessionModalProps) {
  const { isModalOpen, onModalClose } = props
  const [session, updateSession] = useImmer(defaultSession)

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSession((draft) => { draft.title.value = e.target.value })
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateSession((draft) => { draft.description.value = e.target.value })
  }

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSession((draft) => { draft.startDate.value = e.target.value })
  }

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSession((draft) => { draft.endDate.value = e.target.value })
  }

  const handleMeetingLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSession((draft) => { draft.meetingLink.value = e.target.value })
  }

  const handleLocationChange = (nextValue: string) => {
    updateSession((draft) => { draft.location.value = nextValue })
  }

  const handleModalCancel = () => {
    onModalClose()
  }

  const handleCreate = () => {
    console.log(session)
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
              error={session.title.error}
              inputProps={{ onChange: handleTitleChange, value: session.title.value }}
            />
            <Box>
              <Text marginBottom="2"> Description </Text>
              <Textarea placeholder="Include your meeting agenda here..." value={session.description.value} onChange={handleDescriptionChange} />
              {!!session.description.error && <Text position="absolute" fontSize="xs" color="red.600">{session.description.error}</Text>}
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
                    onChange={handleStartDateChange}
                    value={session.startDate.value}
                  />
                  {!!session.startDate.error && <Text fontSize="xs" color="red.600">{session.startDate.error}</Text>}
                </Box>
                <Box>
                  <Text marginBottom="1">End Date & Time</Text>
                  <Input
                    size="md"
                    type="datetime-local"
                    onChange={handleEndDateChange}
                    value={session.endDate.value}
                  />
                  {!!session.endDate.error && <Text fontSize="xs" color="red.600">{session.endDate.error}</Text>}
                </Box>
              </Stack>
            </Box>
            <Flex dir="row" alignContent="center" gap="5" marginBottom={session.location.error ? '0' : '8'}>
              <Text fontSize="md">Location: </Text>
              <RadioGroup onChange={handleLocationChange} value={session.location.value}>
                <Stack direction="row">
                  <Radio value="online">Online</Radio>
                  <Radio value="physical">Physical</Radio>
                </Stack>
              </RadioGroup>
            </Flex>
            {!!session.location.error && <Text fontSize="xs" color="red.600" marginBottom="8">{session.description.error}</Text>}
            <ControlledTextInput
              label={session.location.value === 'online' ? 'Meeting Venue' : 'Meeting Link'}
              type="text"
              error={session.meetingLink.error}
              inputProps={{ onChange: handleMeetingLinkChange, value: session.meetingLink.value }}
            />
          </Flex>
          <Flex gap="4" justify="flex-end" mt="8">
            <Button colorScheme="red" size="sm" variant="outline" onClick={handleModalCancel}>Cancel</Button>
            <Button colorScheme="red" size="sm" onClick={handleCreate}> Create </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default CreateSessionModal
