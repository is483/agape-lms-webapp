import { useParams, useNavigate } from 'react-router-dom'
import {
  Box, Divider, Text, Flex, HStack, Button,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import {
  BackButton, Container, Icon, ProfileIcon,
} from '../../../components'
import paths from '../../../paths'
import { useLazyGetSessionDetailsMenteeQuery, useLazyGetSessionDetailsMentorQuery } from '../../../app/services/session/apiSessionSlice'
import { useAppSelector } from '../../../hooks'
import { getAuth } from '../../../app/redux/selectors'

function SessionDetails() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const { role } = useAppSelector(getAuth)
  const [getMenteeSessionDetails, menteeSessionDetailsResult] = useLazyGetSessionDetailsMenteeQuery()
  const [getMentorSessionDetails, mentorSessionDetailsResult] = useLazyGetSessionDetailsMentorQuery()

  useEffect(() => {
    if (role === 'Mentor' && sessionId) {
      getMentorSessionDetails(sessionId)
    } else if (sessionId) {
      getMenteeSessionDetails(sessionId)
    }
  }, [sessionId, role, getMenteeSessionDetails, getMentorSessionDetails])

  const { data } = role === 'Mentor' ? mentorSessionDetailsResult : menteeSessionDetailsResult
  const {
    firstName, lastName, profileImgUrl, menteeId,
  } = data?.mentee ?? {}

  const {
    title, description, fromDateTime, toDateTime, location,
  } = data?.sessionDetails ?? {}

  const startDateObject = new Date(fromDateTime as string)
  const startDate = startDateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const startTime = startDateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

  const endDateObject = new Date(toDateTime as string)
  const endTime = endDateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

  const differenceInHours = (endDateObject.getTime() - startDateObject.getTime()) / (1000 * 60 * 60)

  const handleViewMentee = () => {
    navigate(`${paths.AssignedMentees}/${menteeId}`)
  }
  return (
    <Container position="relative" minH="calc(100vh - 34px)">
      <BackButton path={paths.Sessions.ViewAll} />
      <Divider position="absolute" left="0" mt="6" />
      <Flex justifyContent="space-between" flexDir={['column-reverse', 'column-reverse', 'row']} mt="12">
        <Text fontSize="lg" fontWeight="600"> {title} </Text>
        <HStack alignSelf={{ base: 'flex-end', md: 'center' }} marginBottom={['5', '5', '0']}>
          <Button px="0" rounded="full">
            <Icon name="edit" fontSize="24px" />
          </Button>
          <Button px="0" rounded="full">
            <Icon name="delete" fontSize="30px" />
          </Button>
        </HStack>
      </Flex>

      <Flex gap={['3', '3', '10']} flexDir={['column', 'column', 'row']} mt={['5', '5', '2']}>
        <HStack>
          <Icon name="calendar_today" fontSize="25px" />
          <Text color="secondary.500">{startDate}</Text>
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
        <Text color="secondary.500" isTruncated>{location}</Text>
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
        <Text fontWeight="600" fontSize="lg">Description </Text>
        <Text color="secondary.500">
          {description}
        </Text>
      </Box>
    </Container>
  )
}
export default SessionDetails
