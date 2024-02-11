import {
  Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Badge, Text, VStack, Button, HStack, useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useAppSelector } from '../../../hooks'
import { getAuth } from '../../../app/redux/selectors'
import { SessionResponse } from '../../../app/services/session/types'
import { Icon } from '../../../components'
import AcceptSessionModal from '../SessionResponseModal/AcceptSessionModal'

interface PendingSessionsTableProps {
  data: SessionResponse
}

function PendingSessionsTable(props: PendingSessionsTableProps) {
  const { data } = props
  const { role } = useAppSelector(getAuth)
  return role === 'Mentor' ? (
    <PendingSessionsTableMentor data={data} />
  ) : (
    <PendingSessionsTableMentee data={data} />
  )
}

function PendingSessionsTableMentor(props: PendingSessionsTableProps) {
  const { data } = props

  return (
    <TableContainer whiteSpace="unset" width="100%">
      <Table variant="simple">
        <Thead backgroundColor="gray.100">
          <Tr>
            <Th>Date & Time</Th>
            <Th>Title</Th>
            <Th> Type </Th>
            <Th> Status </Th>
            <Th> <Flex justifyContent="center">Reason </Flex></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((session) => {
            const {
              fromDateTime, title, sessionType, status,
            } = session

            const dateObject = new Date(fromDateTime)
            const date = dateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            const time = dateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

            return (
              <Tr>
                <Td>
                  <VStack alignItems="start">
                    <Text color="primary.800"> {date}</Text>
                    <Text> {time}</Text>
                  </VStack>
                </Td>
                <Td>
                  {title}
                </Td>
                <Td>
                  {sessionType.charAt(0).toUpperCase() + sessionType.slice(1)}
                </Td>
                <Td>
                  <Badge
                    colorScheme={status === 'Pending' ? 'yellow' : 'red'}
                  >
                    {status === 'Pending' ? 'Awaiting Confirmation' : 'Rejected'}
                  </Badge>
                </Td>
                <Td>
                  {status === 'Rejected' && <Flex justifyContent="center"><Icon name="info" /></Flex>}
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

function PendingSessionsTableMentee(props: PendingSessionsTableProps) {
  const { data } = props
  const [acceptedSessionId, setAcceptedSessionId] = useState<number | string>('')
  const { isOpen: isAcceptSessionModalOpen, onOpen: onOpenAcceptSessionModal, onClose: onAcceptSessionModalClose } = useDisclosure()

  const handleOpenAcceptModal = (sessionId: number | string) => {
    setAcceptedSessionId(sessionId)
    onOpenAcceptSessionModal()
  }
  return (
    <TableContainer whiteSpace="unset" width="100%">
      <AcceptSessionModal isModalOpen={isAcceptSessionModalOpen} onModalClose={onAcceptSessionModalClose} sessionId={acceptedSessionId} />
      <Table variant="simple">
        <Thead backgroundColor="gray.100">
          <Tr>
            <Th>Date & Time</Th>
            <Th>Title</Th>
            <Th> Type </Th>
            <Th><Flex display="flex" justifyContent="start">Status</Flex>  </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((session) => {
            const {
              fromDateTime, title, sessionType, status, sessionId,
            } = session

            const dateObject = new Date(fromDateTime)
            const date = dateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            const time = dateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

            return (
              <Tr>
                <Td>
                  <VStack alignItems="start">
                    <Text color="primary.800"> {date}</Text>
                    <Text> {time}</Text>
                  </VStack>
                </Td>
                <Td>
                  {title}
                </Td>
                <Td>
                  {sessionType.charAt(0).toUpperCase() + sessionType.slice(1)}
                </Td>
                <Td>
                  {status === 'Pending' && (
                    <HStack display="flex" justifyContent="start">
                      <Button colorScheme="red" size="sm" onClick={() => handleOpenAcceptModal(sessionId)}>
                        <HStack>
                          <Icon name="done" color="white" />
                          <Text> Accept</Text>
                        </HStack>
                      </Button>
                      <Button colorScheme="red" variant="outline" size="sm">
                        <HStack>
                          <Icon name="close" color="primary.700" />
                          <Text> Decline</Text>
                        </HStack>
                      </Button>
                    </HStack>
                  )}
                  {status === 'Rejected' && (
                    <Badge
                      colorScheme="yellow"
                    >
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
