/* eslint-disable no-param-reassign */
import {
  Box,
  Button, Divider, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Text, Textarea,
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { useImmer } from 'use-immer'
import { ControlledTextInput } from '../../../components'
import { clearErrors } from '../../../utils'

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
  meetingArrangement: { value: '', error: '' },
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

  const handleMeetingArrangementChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSession((draft) => { draft.meetingArrangement.value = e.target.value })
  }

  const handleLocationChange = (nextValue: string) => {
    updateSession((draft) => { draft.location.value = nextValue })
  }

  const handleModalCancel = () => {
    onModalClose()
  }

  const handleCreate = () => {
    let hasErrors: boolean = false
    updateSession((draft) => clearErrors(draft))
    if (!session.title.value.trim()) {
      updateSession((draft) => { draft.title.error = 'Session title is required' })
      hasErrors = true
    }

    if (!session.description.value.trim()) {
      updateSession((draft) => { draft.description.error = 'Session description is required' })
      hasErrors = true
    }

    if (!session.location.value.trim()) {
      updateSession((draft) => { draft.location.error = 'Session description is required' })
      hasErrors = true
    }

    if (!session.meetingArrangement.value.trim()) {
      updateSession((draft) => { draft.meetingArrangement.error = 'Meeting arrangement is required' })
      hasErrors = true
    }

    if (!session.startDate.value) {
      updateSession((draft) => { draft.startDate.error = 'Start date/time of session is required' })
      hasErrors = true
    }

    if (!session.endDate.value) {
      updateSession((draft) => { draft.endDate.error = 'End date/time of session is required' })
      hasErrors = true
    }

    const startDate = new Date(session.startDate.value)
    const endDate = new Date(session.endDate.value)

    if (startDate >= endDate) {
      updateSession((draft) => {
        draft.startDate.error = 'Start date/time must be before the end date/time'
        hasErrors = true
      })
    }

    if (hasErrors) {

    }
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
                  <Radio value="online" colorScheme="red">Online</Radio>
                  <Radio value="physical" colorScheme="red">Physical</Radio>
                </Stack>
              </RadioGroup>
            </Flex>
            {!!session.location.error && <Text fontSize="xs" color="red.600" marginBottom="8">{session.description.error}</Text>}
            <ControlledTextInput
              label={session.location.value === 'online' ? 'Meeting Link' : 'Meeting Venue'}
              type="text"
              error={session.meetingArrangement.error}
              inputProps={{ onChange: handleMeetingArrangementChange, value: session.meetingArrangement.value }}
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
