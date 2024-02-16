/* eslint-disable no-param-reassign */
import {
  Box,
  Button, Divider, Flex, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, SimpleGrid, Text,
} from '@chakra-ui/react'
import { useImmer } from 'use-immer'
import { ChangeEvent } from 'react'
import { clearErrors, clearValues } from '../../../utils'
import { useGetDeclineReasonQuery } from '../../../app/services/session/apiSessionSlice'

const defaultSession = {
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
  const { data, isLoading } = useGetDeclineReasonQuery(sessionId)

  const handleModalCancel = () => {
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

  return (
    <Modal isOpen={isModalOpen} onClose={onModalClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent p="4" m="4" maxHeight="70vh">
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

            <SimpleGrid columns={[1, 1, 2]} spacing={10} marginBottom="3">
              <Box>
                <Text marginBottom="1">Start Date & Time</Text>
                <Input
                  size="md"
                  type="datetime-local"
                  onChange={handleFromDateTimeChange}
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
                  value={session.proposedToDateTime.value}
                />
                {!!session.proposedToDateTime.error && <Text fontSize="xs" color="red.600">{session.proposedToDateTime.error}</Text>}
              </Box>
            </SimpleGrid>
          </Flex>
          <Flex gap="4" justify="flex-end" mt="8">
            <Button colorScheme="red" size="sm" variant="outline" onClick={handleModalCancel}>Cancel</Button>
            <Button colorScheme="red" size="sm" isLoading={isLoading}> Save </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default UpdateSessionModal
