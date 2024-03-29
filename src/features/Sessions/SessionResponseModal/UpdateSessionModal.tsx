/* eslint-disable no-param-reassign */
import {
  Box,
  Button, Divider, Flex, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, SimpleGrid, Switch, Text, useToast,
} from '@chakra-ui/react'
import { useImmer } from 'use-immer'
import { ChangeEvent } from 'react'
import { clearErrors, clearValues } from '../../../utils'
import { useGetDeclineReasonQuery, useUpdateSessionMutation } from '../../../app/services/session/apiSessionSlice'
import { UpdateSessionRequest } from '../../../app/services/session/types'

const defaultSession = {
  isProposed: { value: false },
  proposedFromDateTime: { value: '', error: '' },
  proposedToDateTime: { value: '', error: '' },
}
interface UpdateSessionModalProps {
  isModalOpen: boolean
  onModalClose: () => void
  sessionId: string | number
  refetchSessions: () => void
}

function UpdateSessionModal(props: UpdateSessionModalProps) {
  const [session, updateSession] = useImmer(defaultSession)
  const {
    isModalOpen, onModalClose, sessionId, refetchSessions,
  } = props
  const { data } = useGetDeclineReasonQuery(sessionId)
  const [updateSessionMutation, { isLoading }] = useUpdateSessionMutation()
  const toast = useToast()

  const handleModalClose = () => {
    updateSession((draft) => clearErrors(draft))
    updateSession((draft) => clearValues(draft))
    onModalClose()
  }

  const handleFromDateTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSession((draft) => { draft.proposedFromDateTime.value = e.target.value })
  }

  const handleToDateTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSession((draft) => { draft.proposedToDateTime.value = e.target.value })
  }

  const formatDateTime = (dateTime: string | undefined) => {
    if (!dateTime) return ''
    const date = new Date(dateTime)
    const dateString = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    const timeString = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    return `${dateString} ${timeString}`
  }

  const handleToggleChange = () => {
    updateSession((draft) => {
      draft.isProposed.value = !draft.isProposed.value
      if (!draft.isProposed.value) {
        clearValues(draft)
      } else if (draft.isProposed.value && data?.proposedFromDateTime && data?.proposedToDateTime) {
        const formatDateTimeForInput = (dateTime: string) => {
          const date = new Date(dateTime)
          const offset = date.getTimezoneOffset() * 60000
          const localISOTime = (new Date(date.getTime() - offset)).toISOString().slice(0, -1)
          return localISOTime.substring(0, 16)
        }
        draft.proposedFromDateTime.value = formatDateTimeForInput(data.proposedFromDateTime)
        draft.proposedToDateTime.value = formatDateTimeForInput(data.proposedToDateTime)
      }
    })
  }
  const handleSave = async () => {
    let hasErrors: boolean = false
    updateSession((draft) => clearErrors(draft))

    const startDate = new Date(session.proposedFromDateTime.value)
    const endDate = new Date(session.proposedToDateTime.value)
    const todayDate = new Date()

    if (!session.proposedFromDateTime.value) {
      updateSession((draft) => { draft.proposedFromDateTime.error = 'Start date/time of session is required' })
      hasErrors = true
    }

    if (!session.proposedToDateTime.value) {
      updateSession((draft) => { draft.proposedToDateTime.error = 'End date/time of session is required' })
      hasErrors = true
    }

    if (startDate >= endDate) {
      updateSession((draft) => {
        draft.proposedFromDateTime.error = 'Start date/time must be before the end date/time'
      })
      hasErrors = true
    }

    if (startDate < todayDate) {
      updateSession((draft) => {
        draft.proposedFromDateTime.error = 'Start date/time cannot be earlier than today'
      })
      hasErrors = true
    }

    if (hasErrors) {
      return
    }

    try {
      const updateSessionRequest: UpdateSessionRequest = {
        sessionId,
        body: {
          fromDateTime: session.proposedFromDateTime.value,
          toDateTime: session.proposedToDateTime.value,
        },
      }
      await updateSessionMutation(updateSessionRequest).unwrap()
      toast({
        title: 'Update Session',
        description: 'Session date updated! If not based on your mentee\'s suggestion, it awaits their approval before confirmation',
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
      <ModalContent p="4" m="4" maxHeight="90vh" overflowY="auto">
        <ModalHeader> View Decline Reason</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" mt="3" gap="5">
            <Box>
              <Text fontWeight="600" fontSize="md"> Reason</Text>
              <Text>{data?.declineReason}</Text>
            </Box>

            <Box>
              <Text fontWeight="600" fontSize="md">Proposed Date & Time</Text>
              <HStack>
                <Text color="red.600">  {formatDateTime(data?.proposedFromDateTime)} to {formatDateTime(data?.proposedToDateTime)} </Text>
              </HStack>
            </Box>
            <Divider orientation="horizontal" />
            <Text fontWeight="600" fontSize="md"> Set New Date & Time </Text>

            <Flex justifyContent="space-between" alignItems="center">
              <Text>Accept Proposed Date & Time</Text>
              <Switch size="md" colorScheme="red" isChecked={session.isProposed.value} onChange={handleToggleChange} />
            </Flex>

            <SimpleGrid columns={[1, 1, 2]} spacing={10} marginBottom="3">
              <Box>
                <Text marginBottom="1">Start Date & Time</Text>
                <Input
                  size="md"
                  type="datetime-local"
                  onChange={handleFromDateTimeChange}
                  isDisabled={session.isProposed.value}
                  value={session.proposedFromDateTime.value}
                />
                {!!session.proposedFromDateTime.error && <Text fontSize="xs" color="red.600">{session.proposedFromDateTime.error}</Text>}
              </Box>
              <Box>
                <Text marginBottom="1">End Date & Time</Text>
                <Input
                  size="md"
                  type="datetime-local"
                  onChange={handleToDateTimeChange}
                  isDisabled={session.isProposed.value}
                  value={session.proposedToDateTime.value}
                />
                {!!session.proposedToDateTime.error && <Text fontSize="xs" color="red.600">{session.proposedToDateTime.error}</Text>}
              </Box>
            </SimpleGrid>
          </Flex>
          <Flex gap="4" justify="flex-end" mt="8">
            <Button colorScheme="red" size="sm" variant="outline" onClick={handleModalClose}>Cancel</Button>
            <Button colorScheme="red" size="sm" isLoading={isLoading} onClick={handleSave}> Save </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default UpdateSessionModal
