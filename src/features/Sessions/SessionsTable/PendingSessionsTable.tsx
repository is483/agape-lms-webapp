import {
  Flex, Table, TableContainer, Tbody, Td,
  Th, Thead, Tr, Badge, Text, VStack, Button, HStack, useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useAppSelector } from '../../../hooks'
import { getAuth } from '../../../app/redux/selectors'
import { AllSessionsByMentoringJourneyResponse, SessionResponse } from '../../../app/services/session/types'
import { Icon } from '../../../components'
import AcceptSessionModal from '../SessionResponseModal/AcceptSessionModal'
import DeclineSessionModal from '../SessionResponseModal/DeclineSessionModal'
import UpdateSessionModal from '../SessionResponseModal/UpdateSessionModal'

interface PendingSessionsTableProps {
  data: SessionResponse | AllSessionsByMentoringJourneyResponse
  refetchMentorSessions: () => void
  refetchMenteeSessions: () => void
}

function PendingSessionsTable(props: PendingSessionsTableProps) {
  const { data, refetchMentorSessions, refetchMenteeSessions } = props
  const { role } = useAppSelector(getAuth)
  return role === 'Mentee' ? (
    <PendingSessionsTableMentee refetchSessions={refetchMenteeSessions} data={data} />
  ) : (
    <PendingSessionsTableMentorAdmin refetchSessions={refetchMentorSessions} data={data} />
  )
}

interface PendingSessionsTableMentorProps {
  data: SessionResponse
  refetchSessions: () => void
}

function PendingSessionsTableMentorAdmin(props: PendingSessionsTableMentorProps) {
  const { data, refetchSessions } = props
  const { role } = useAppSelector(getAuth)
  const [sessionId, setSessionId] = useState<number | string>('')
  const { isOpen: isUpdateSessionModalOpen, onOpen: onOpenUpdateSessionModal, onClose: onAcceptUpdateModalClose } = useDisclosure()
  const handleOpenUpdateSessionModal = (sessionId: number | string) => {
    setSessionId(sessionId)
    onOpenUpdateSessionModal()
  }

  return (
    <TableContainer whiteSpace="unset" width="100%">
      <UpdateSessionModal refetchSessions={refetchSessions} isModalOpen={isUpdateSessionModalOpen} onModalClose={onAcceptUpdateModalClose} sessionId={sessionId} />
      <Table variant="simple">
        <Thead backgroundColor="gray.100">
          <Tr>
            <Th>Date & Time</Th>
            <Th>Title</Th>
            <Th>Type</Th>
            <Th>Status</Th>
            {role === 'Mentor' && (
              <Th> <Flex justifyContent="center">Reason </Flex></Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {data.length === 0 && (
            <Tr>
              <Td colSpan={5}>
                <Flex height="40px" justify="center" align="center">
                  No sessions
                </Flex>
              </Td>
            </Tr>
          )}
          {data.map((session) => {
            const {
              fromDateTime, toDateTime, title, sessionType, status, sessionId,
            } = session

            const fromDateObject = new Date(fromDateTime)
            const fromDate = fromDateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            const fromTime = fromDateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

            const toDateObject = new Date(toDateTime)
            const toDate = toDateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            const toTime = toDateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

            return (
              <Tr>
                <Td>
                  <VStack alignItems="start">
                    <Text color="primary.800" fontSize="sm"> {fromDate === toDate ? fromDate : `${fromDate} - ${toDate}`}</Text>
                    <Text> {`${fromTime} to ${toTime}`}</Text>
                  </VStack>
                </Td>
                <Td>
                  {title}
                </Td>
                <Td textTransform="capitalize">
                  {sessionType}
                </Td>
                <Td>
                  <Badge
                    colorScheme={status === 'Pending' ? 'yellow' : 'red'}
                  >
                    {status === 'Pending' ? 'Awaiting Confirmation' : 'Rejected'}
                  </Badge>
                </Td>
                {role === 'Mentor' && (
                  <Td>
                    {status === 'Rejected' && <Flex justifyContent="center"><Icon name="info" _hover={{ cursor: 'pointer' }} onClick={() => handleOpenUpdateSessionModal(sessionId)} /></Flex>}
                  </Td>
                )}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

interface PendingSessionsTableMenteeProps {
  data: SessionResponse
  refetchSessions: () => void
}

function PendingSessionsTableMentee(props: PendingSessionsTableMenteeProps) {
  const { data, refetchSessions } = props
  const [sessionId, setSessionId] = useState<number | string>('')
  const { isOpen: isAcceptSessionModalOpen, onOpen: onOpenAcceptSessionModal, onClose: onAcceptSessionModalClose } = useDisclosure()
  const { isOpen: isDeclineSessionModalOpen, onOpen: onOpenDeclineSessionModal, onClose: onDeclineSessionModalClose } = useDisclosure()

  const handleOpenAcceptModal = (sessionId: number | string) => {
    setSessionId(sessionId)
    onOpenAcceptSessionModal()
  }

  const handleOpenDeclineModal = (sessionId: number | string) => {
    setSessionId(sessionId)
    onOpenDeclineSessionModal()
  }
  return (
    <TableContainer whiteSpace="unset" width="100%">
      <AcceptSessionModal refetchSessions={refetchSessions} isModalOpen={isAcceptSessionModalOpen} onModalClose={onAcceptSessionModalClose} sessionId={sessionId} />
      <DeclineSessionModal refetchSessions={refetchSessions} isModalOpen={isDeclineSessionModalOpen} onModalClose={onDeclineSessionModalClose} sessionId={sessionId} />
      <Table variant="simple">
        <Thead backgroundColor="gray.100">
          <Tr>
            <Th>Date & Time</Th>
            <Th>Title</Th>
            <Th>Type</Th>
            <Th><Flex justifyContent="start">Status</Flex></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.length === 0 && (
            <Tr>
              <Td colSpan={5}>
                <Flex height="40px" justify="center" align="center">
                  No sessions
                </Flex>
              </Td>
            </Tr>
          )}
          {data.map((session) => {
            const {
              fromDateTime, toDateTime, title, sessionType, status, sessionId,
            } = session

            const fromDateObject = new Date(fromDateTime)
            const fromDate = fromDateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            const fromTime = fromDateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

            const toDateObject = new Date(toDateTime)
            const toDate = toDateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            const toTime = toDateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

            return (
              <Tr>
                <Td>
                  <VStack alignItems="start">
                    <Text color="primary.800" fontSize="sm"> {fromDate === toDate ? fromDate : `${fromDate} - ${toDate}`}</Text>
                    <Text> {`${fromTime} to ${toTime}`}</Text>
                  </VStack>
                </Td>
                <Td>
                  {title}
                </Td>
                <Td textTransform="capitalize">
                  {sessionType}
                </Td>
                <Td>
                  {status === 'Pending' && (
                    <HStack justifyContent="start">
                      <Button colorScheme="red" size="sm" onClick={() => handleOpenAcceptModal(sessionId)}>
                        <HStack>
                          <Icon name="done" color="white" />
                          <Text>Accept</Text>
                        </HStack>
                      </Button>
                      <Button colorScheme="red" variant="outline" size="sm" onClick={() => handleOpenDeclineModal(sessionId)}>
                        <HStack>
                          <Icon name="close" color="primary.700" />
                          <Text>Decline</Text>
                        </HStack>
                      </Button>
                    </HStack>
                  )}
                  {status === 'Rejected' && (
                    <Badge colorScheme="yellow">
                      Awaiting Confirmation
                    </Badge>
                  )}

                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default PendingSessionsTable
