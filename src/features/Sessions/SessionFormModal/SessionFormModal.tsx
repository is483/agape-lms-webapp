/* eslint-disable no-param-reassign */
import {
  Box, Button, Divider, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalHeader, ModalOverlay, Radio, RadioGroup, SimpleGrid, Stack, Text, useToast,
} from '@chakra-ui/react'
import { ChangeEvent, useEffect } from 'react'
import { useImmer } from 'use-immer'
import ReactQuill from 'react-quill'
import { ControlledTextInput } from '../../../components'
import { clearErrors, clearValues } from '../../../utils'
import { useCreateSessionMutation, useEditSessionMutation } from '../../../app/services/session/apiSessionSlice'
import { CreateSessionRequest, EditSessionRequest, SessionDetailsResponse } from '../../../app/services/session/types'

interface SessionModalProps {
  isModalOpen: boolean
  onModalClose: () => void
  menteeId?: number | string
  refetchSessions?: () => void
  sessionDetails?: SessionDetailsResponse
}
SessionFormModal.defaultProps = {
  sessionDetails: undefined,
  refetchSessions: undefined,
  menteeId: undefined,
}

const defaultSession = {
  title: { value: '', error: '' },
  description: { value: '', error: '' },
  fromDateTime: { value: '', error: '' },
  toDateTime: { value: '', error: '' },
  sessionType: { value: 'online', error: '' },
  location: { value: '', error: '' },
}

function SessionFormModal(props: SessionModalProps) {
  const {
    isModalOpen, onModalClose, menteeId, refetchSessions, sessionDetails,
  } = props
  const [session, updateSession] = useImmer(defaultSession)
  const toast = useToast()
  const [editSession, { isLoading: isEditSessionLoading }] = useEditSessionMutation()
  const [createSession, { isLoading: isCreateSessionLoading }] = useCreateSessionMutation()
  const isEdit = !!sessionDetails

  useEffect(() => {
    if (!sessionDetails || !isModalOpen) return
    updateSession((draft) => {
      draft.title.value = sessionDetails.sessionDetails.title
      draft.description.value = sessionDetails.sessionDetails.description
      draft.fromDateTime.value = new Date(sessionDetails.sessionDetails.fromDateTime).toLocaleString('sv-SE', {
        timeZone: 'Asia/Singapore', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
      }).replace(' ', 'T')
      draft.toDateTime.value = new Date(sessionDetails.sessionDetails.toDateTime).toLocaleString('sv-SE', {
        timeZone: 'Asia/Singapore', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
      }).replace(' ', 'T')
      draft.sessionType.value = sessionDetails.sessionDetails.sessionType
      draft.location.value = sessionDetails.sessionDetails.location
    })
  }, [sessionDetails, updateSession, isModalOpen])

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSession((draft) => { draft.title.value = e.target.value })
  }

  const handleDescriptionChange = (description: string) => {
    updateSession((draft) => { draft.description.value = description })
  }

  const handleFromDateTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSession((draft) => { draft.fromDateTime.value = e.target.value })
  }

  const handleToDateTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSession((draft) => { draft.toDateTime.value = e.target.value })
  }

  const handleSessionTypeChange = (nextValue: string) => {
    updateSession((draft) => { draft.sessionType.value = nextValue })
  }

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSession((draft) => { draft.location.value = e.target.value })
  }

  const handleModalClose = () => {
    updateSession((draft) => clearErrors(draft))
    updateSession((draft) => clearValues(draft))
    onModalClose()
  }

  const handleCreate = async () => {
    let hasErrors: boolean = false
    updateSession((draft) => clearErrors(draft))
    if (!session.title.value.trim()) {
      updateSession((draft) => { draft.title.error = 'Session title is required' })
      hasErrors = true
    }
    if (session.title.value.length > 500) {
      updateSession((draft) => { draft.title.error = 'Title must not exceed 500 characters' })
      hasErrors = true
    }

    if (!session.description.value.trim()) {
      updateSession((draft) => { draft.description.error = 'Session description is required' })
      hasErrors = true
    }

    if (session.description.value.length > 2000) {
      updateSession((draft) => { draft.description.error = 'Description must not exceed 2000 characters' })
      hasErrors = true
    }
    if (!session.sessionType.value.trim()) {
      updateSession((draft) => { draft.sessionType.error = 'Meeting arrangement is required' })
      hasErrors = true
    }

    if (!session.location.value.trim()) {
      updateSession((draft) => { draft.location.error = 'Location is required' })
      hasErrors = true
    }

    if (!session.fromDateTime.value) {
      updateSession((draft) => { draft.fromDateTime.error = 'Start date/time of session is required' })
      hasErrors = true
    }

    if (!session.toDateTime.value) {
      updateSession((draft) => { draft.toDateTime.error = 'End date/time of session is required' })
      hasErrors = true
    }

    const startDate = new Date(session.fromDateTime.value)
    const endDate = new Date(session.toDateTime.value)
    const todayDate = new Date()

    if (startDate >= endDate) {
      updateSession((draft) => {
        draft.fromDateTime.error = 'Start date/time must be before the end date/time'
      })
      hasErrors = true
    }

    if (startDate < todayDate) {
      updateSession((draft) => {
        draft.fromDateTime.error = 'Start date/time cannot be earlier than today'
      })
      hasErrors = true
    }

    if (hasErrors) {
      return
    }

    if (!isEdit) {
      const createRequest: CreateSessionRequest = {
        menteeId: menteeId!,
        body: {
          title: session.title.value,
          description: session.description.value,
          fromDateTime: session.fromDateTime.value,
          toDateTime: session.toDateTime.value,
          sessionType: session.sessionType.value,
          location: session.location.value,
        },
      }
      try {
        await createSession(createRequest).unwrap()
        toast({
          title: 'New Session',
          description: 'New session has been successfully created! You may now view your new session under Pending Sessions',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-right',
        })
        refetchSessions && refetchSessions()
        onModalClose()
      } catch (e) {
        console.error(e)
      }
    } else {
      const editRequest: EditSessionRequest = {
        sessionId: sessionDetails.sessionDetails.sessionId!,
        body: {
          title: session.title.value,
          description: session.description.value,
          fromDateTime: session.fromDateTime.value,
          toDateTime: session.toDateTime.value,
          sessionType: session.sessionType.value,
          location: session.location.value,
        },
      }
      try {
        await editSession(editRequest).unwrap()
        toast({
          title: 'Edit Session',
          description: 'Session has been successfully edited!',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-right',
        })
        refetchSessions && refetchSessions()
        onModalClose()
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <Modal isOpen={isModalOpen} onClose={handleModalClose} size="3xl" isCentered>
      <ModalOverlay />
      <ModalContent p="4" m="4" maxHeight="90vh" overflowY="auto">
        <ModalHeader>{isEdit ? 'Edit Session' : 'Create Session'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" mt="4" gap="4">
            <ControlledTextInput
              label="Title"
              type="text"
              error={session.title.error}
              inputProps={{ onChange: handleTitleChange, value: session.title.value }}
            />
            <Box>
              <Text marginBottom="2"> Description </Text>
              <ReactQuill
                theme="snow"
                value={session.description.value}
                onChange={handleDescriptionChange}
                className="react-quill-update"
              />
              {!!session.description.error && <Text position="absolute" fontSize="xs" color="red.600">{session.description.error}</Text>}
            </Box>
            <Divider orientation="horizontal" marginTop="4" />
            <Text fontWeight="600" fontSize="md"> Meeting Details</Text>
            <SimpleGrid columns={[1, 1, 2]} spacing={10} marginBottom="3">
              <Box>
                <Text marginBottom="1">Start Date & Time</Text>
                <Input
                  size="md"
                  type="datetime-local"
                  onChange={handleFromDateTimeChange}
                  value={session.fromDateTime.value}
                />
                {!!session.fromDateTime.error && <Text fontSize="xs" color="red.600">{session.fromDateTime.error}</Text>}
              </Box>

              <Box>
                <Text marginBottom="1">End Date & Time</Text>
                <Input
                  size="md"
                  type="datetime-local"
                  onChange={handleToDateTimeChange}
                  value={session.toDateTime.value}
                />
                {!!session.toDateTime.error && <Text fontSize="xs" color="red.600">{session.toDateTime.error}</Text>}
              </Box>
            </SimpleGrid>
            <Flex dir="row" alignContent="center" gap="5" marginBottom={session.sessionType.error ? '0' : '3'}>
              <Text fontSize="md">Session Type: </Text>
              <RadioGroup onChange={handleSessionTypeChange} value={session.sessionType.value}>
                <Stack direction="row">
                  <Radio value="online" colorScheme="red">Online</Radio>
                  <Radio value="physical" colorScheme="red">Physical</Radio>
                </Stack>
              </RadioGroup>
            </Flex>
            {!!session.location.error && <Text fontSize="xs" color="red.600">{session.sessionType.error}</Text>}
            <Flex alignItems={['start', 'start', 'center']} gap="3" flexDir={['column', 'column', 'row']} width="100%">
              <Text> {session.sessionType.value === 'online' ? 'Meeting Link:' : 'Address:'}  </Text>
              <Box flex="1" w="100%">
                <ControlledTextInput
                  type="text"
                  error={session.location.error}
                  inputProps={{ onChange: handleLocationChange, value: session.location.value }}
                />
              </Box>
            </Flex>
          </Flex>
          <Flex gap="4" justify="flex-end" mt="8">
            <Button colorScheme="red" size="sm" variant="outline" onClick={handleModalClose}>Cancel</Button>
            <Button colorScheme="red" size="sm" onClick={handleCreate} isLoading={isEdit ? isEditSessionLoading : isCreateSessionLoading}> {isEdit ? 'Save' : 'Create'} </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default SessionFormModal
