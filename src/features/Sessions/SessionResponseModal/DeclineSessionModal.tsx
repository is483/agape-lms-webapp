/* eslint-disable no-param-reassign */
// TODO: This will be moved into the same folder with Delete Session Modal

import {
  Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, SimpleGrid, Box, Text, Input, Textarea, useToast, Divider,
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { useImmer } from 'use-immer'
import { clearErrors, clearValues } from '../../../utils'
import { useDeclineSessionMutation } from '../../../app/services/session/apiSessionSlice'
import { DeclineSessionRequest } from '../../../app/services/session/types'

interface DeclineSessionModalProps {
  isModalOpen: boolean
  onModalClose: () => void
  sessionId: string | number
  refetchSessions: () => void
}

const defaultSession = {
  reason: { value: '', error: '' },
  fromDateTime: { value: '', error: '' },
  toDateTime: { value: '', error: '' },
}

function DeclineSessionModal(props: DeclineSessionModalProps) {
  const {
    isModalOpen, onModalClose, sessionId, refetchSessions,
  } = props
  const [session, updateSession] = useImmer(defaultSession)
  const toast = useToast()
  const [declineSessionMutation, { isLoading }] = useDeclineSessionMutation()

  const handleReasonChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateSession((draft) => { draft.reason.value = e.target.value })
  }

  const handleFromDateTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSession((draft) => { draft.fromDateTime.value = e.target.value })
  }

  const handleToDateTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSession((draft) => { draft.toDateTime.value = e.target.value })
  }
  const handleModalClose = () => {
    updateSession((draft) => clearErrors(draft))
    updateSession((draft) => clearValues(draft))
    onModalClose()
  }
  const handleAccept = async () => {
    let hasErrors: boolean = false
    updateSession((draft) => clearErrors(draft))

    if (!session.reason.value.trim()) {
      updateSession((draft) => { draft.reason.error = 'Session description is required' })
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

    try {
      const declineSessionRequest: DeclineSessionRequest = {
        sessionId,
        body: {
          reason: session.reason.value,
          fromDateTime: session.fromDateTime.value,
          toDateTime: session.toDateTime.value,
        },
      }
      await declineSessionMutation(declineSessionRequest).unwrap()
      toast({
        title: 'Decline Session',
        description: 'You have successfully declined the session, your mentor will be informed of your decision',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      })
      handleModalClose()
      refetchSessions()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Modal isOpen={isModalOpen} onClose={handleModalClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent p="4" m="4" maxHeight="70vh">
        <ModalHeader> Decline Mentoring Session</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" gap="4">
            <Text color="secondary.500">
              Kindly let your mentor know why you are unable to attend the planned session and suggest another date.
            </Text>
            <Box marginBottom={session.reason.error ? '5' : '0'}>
              <Text marginBottom="2"> Description </Text>
              <Textarea placeholder="Include your reason here..." value={session.reason.value} onChange={handleReasonChange} />
              {!!session.reason.error && <Text position="absolute" fontSize="xs" color="red.600">{session.reason.error}</Text>}
            </Box>
            <Divider orientation="horizontal" />
            <Text fontWeight="500"> Alternate Date</Text>
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
          </Flex>

          <Flex gap="4" justify="flex-end" mt="8">
            <Button colorScheme="red" size="sm" variant="outline" onClick={handleModalClose}>Cancel</Button>
            <Button colorScheme="red" size="sm" onClick={handleAccept} isLoading={isLoading}> Confirm </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default DeclineSessionModal
