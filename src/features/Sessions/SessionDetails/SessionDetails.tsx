/* eslint-disable no-param-reassign */
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box, Divider, Text, Flex, HStack, Button, useDisclosure, Link, useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import {
  BackButton, Container, Icon, ProfileIcon,
} from '../../../components'
import paths from '../../../paths'
import { useLazyGetSessionDetailsMenteeQuery, useLazyGetSessionDetailsMentorQuery, useUpdateSessionNotesMutation } from '../../../app/services/session/apiSessionSlice'
import { useAppSelector } from '../../../hooks'
import { getAuth } from '../../../app/redux/selectors'
import SessionFormModal from '../SessionFormModal/SessionFormModal'
import DeleteSessionModal from './DeleteSessionModal'
import { UpdateSessionNotesRequest } from '../../../app/services/session/types'
import '../../../../styles/custom-quill-style.css'

function SessionDetails() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const { role } = useAppSelector(getAuth)
  const toast = useToast()
  const [getMenteeSessionDetails, menteeSessionDetailsResult] = useLazyGetSessionDetailsMenteeQuery()
  const [getMentorSessionDetails, mentorSessionDetailsResult] = useLazyGetSessionDetailsMentorQuery()
  const [updateSessionNotesMutation, { isLoading }] = useUpdateSessionNotesMutation()

  const { data } = role === 'Mentor' ? mentorSessionDetailsResult : menteeSessionDetailsResult
  const {
    firstName, lastName, profileImgUrl, menteeId,
  } = data?.mentee ?? {}

  const {
    title, description, fromDateTime, toDateTime, location, sessionType, notes,
  } = data?.sessionDetails ?? {}

  const [sessionNotes, updateSessionNotes] = useState(notes)
  useEffect(() => {
    if (role === 'Mentor' && sessionId) {
      getMentorSessionDetails(sessionId)
    } else if (sessionId) {
      getMenteeSessionDetails(sessionId)
    }
  }, [sessionId, role, getMenteeSessionDetails, getMentorSessionDetails])

  useEffect(() => {
    if (notes) {
      updateSessionNotes(notes)
    }
  }, [notes])

  const { isOpen: isSessionFormModalOpen, onOpen: onOpenSessionFormModal, onClose: onSessionFormModalClose } = useDisclosure()

  const { isOpen: isDeleteSessionModalOpen, onOpen: onOpenDeleteSessionModal, onClose: onDeleteSessionModalClose } = useDisclosure()
  const todayDate = new Date()
  const startDateObject = new Date(fromDateTime as string)
  const startDate = startDateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const startTime = startDateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

  const endDateObject = new Date(toDateTime as string)
  const endDate = endDateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const endTime = endDateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

  const differenceInHours = (endDateObject.getTime() - startDateObject.getTime()) / (1000 * 60 * 60)

  const isPast = endDateObject <= todayDate

  function ensureProtocol(url: string | undefined) {
    if (!url) {
      return ''
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`
    }
    return url
  }
  const handleViewMentee = () => {
    navigate(`${paths.AssignedMentees}/${menteeId}`)
  }

  const handleNotesChange = (e: string) => {
    updateSessionNotes(e)
  }

  const handleSaveNotes = async () => {
    try {
      const updateSessionNotesRequest: UpdateSessionNotesRequest = {
        sessionId: sessionId!,
        body: {
          notes: sessionNotes!,
        },
      }
      await updateSessionNotesMutation(updateSessionNotesRequest).unwrap()
      toast({
        title: 'Update Session',
        description: 'Session notes have been updated!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Container position="relative" minH="calc(100vh - 34px)" overflowY="auto">
      <SessionFormModal isModalOpen={isSessionFormModalOpen} onModalClose={onSessionFormModalClose} sessionDetails={data} refetchSessions={() => getMentorSessionDetails(sessionId!)} />
      <DeleteSessionModal isModalOpen={isDeleteSessionModalOpen} onModalClose={onDeleteSessionModalClose} sessionId={data?.sessionDetails.sessionId} />
      <BackButton path={paths.Sessions.ViewAll} />
      <Divider position="absolute" left="0" mt="6" />
      <Flex justifyContent="space-between" flexDir={['column-reverse', 'column-reverse', 'row']} mt="12">
        <Text fontSize="lg" fontWeight="600"> {title} </Text>
        {role === 'Mentor' && !isPast && (
          <HStack alignSelf={{ base: 'flex-end', md: 'center' }} marginBottom={['5', '5', '0']}>
            <Button px="0" rounded="full" onClick={onOpenSessionFormModal}>
              <Icon name="edit" fontSize="24px" />
            </Button>
            <Button px="0" rounded="full" onClick={onOpenDeleteSessionModal}>
              <Icon name="delete" fontSize="30px" />
            </Button>
          </HStack>
        )}
      </Flex>

      <Flex gap={['3', '3', '10']} flexDir={['column', 'column', 'row']} mt={['5', '5', '2']}>
        <HStack>
          <Icon name="calendar_today" fontSize="25px" />
          <Text color="secondary.500">{startDate === endDate ? startDate : `${startDate} - ${endDate}`}</Text>
        </HStack>

        <HStack>
          <Icon name="schedule" fontSize="25px" />
          <Text color="secondary.500">{startTime} - {endTime}</Text>
        </HStack>

        <HStack>
          <Icon name="hourglass_top" fontSize="25px" />
          <Text color="secondary.500"> {differenceInHours} hour</Text>
        </HStack>
      </Flex>

      <HStack mt="3">
        <Icon name="location_on" fontSize="25px" />
        {sessionType === 'online' && <Link color="secondary.500" href={ensureProtocol(location)}>{location}</Link>}
        {sessionType === 'physical' && <Text color="secondary.500" isTruncated>{location}</Text>}
      </HStack>

      {role === 'Mentor'
        && (
          <Box mt="10">
            <Text fontWeight="600" fontSize="lg">Mentee</Text>
            <Flex mt="4">
              <Box padding="6" _hover={{ shadow: 'md', transition: '0.5s', cursor: 'pointer' }} border="solid 1px" borderRadius="md" borderColor="secondary.50" display="flex" alignItems="center" gap="2" onClick={handleViewMentee}>
                <HStack spacing="4">
                  <ProfileIcon imgUrl={profileImgUrl} width="55px" height="55px" iconProps={{ fontSize: '30px' }} />
                  <Text fontSize="lg">{firstName} {lastName}</Text>
                </HStack>
              </Box>
            </Flex>
          </Box>
        )}

      <Box mt="10">
        <Text fontWeight="600" fontSize="lg" marginBottom="2">Description </Text>
        <ReactQuill
          value={description}
          readOnly
          theme="snow"
          className="react-quill-read-only"
        />
      </Box>

      <Divider orientation="horizontal" marginBottom="10" />

      {role === 'Mentor' && (
        <Box>
          <Text fontWeight="600" fontSize="lg" marginBottom="5">Notes </Text>
          <ReactQuill
            theme="snow"
            className="react-quill-update"
            value={sessionNotes}
            onChange={handleNotesChange}
          />
          <Flex gap="4" justify="flex-end" mt="8">
            <Button colorScheme="red" size="sm" onClick={handleSaveNotes} isLoading={isLoading}>Save Notes</Button>
          </Flex>
        </Box>
      )}

      {(role === 'Mentee' || role === 'Admin') && (
        <Box>
          <Text fontWeight="600" fontSize="lg" marginBottom="5">Notes </Text>
          <ReactQuill
            theme="snow"
            className="react-quill-read-only"
            value={sessionNotes}
            readOnly
          />
        </Box>
      )}
    </Container>
  )
}
export default SessionDetails
