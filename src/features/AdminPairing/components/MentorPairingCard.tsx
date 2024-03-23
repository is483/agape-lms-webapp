import {
  Box, Circle, Image, Flex, Text, Divider, HStack,
} from '@chakra-ui/react'
import { MentorsAdminResponse } from '../../../app/services/user/types'
import { useGetMenteesWithNoMentoringJourneyByMentorQuery } from '../../../app/services/user/apiUserSlice'
import { Icon } from '../../../components'

interface MentorMenteePairingProps {
  mentorInfo: MentorsAdminResponse
}

function MentorPairingCard(props: MentorMenteePairingProps) {
  const { mentorInfo } = props
  const assignedMentees = mentorInfo?.assignedMentees
  const mentorId = mentorInfo.mentor.userId
  const { data } = useGetMenteesWithNoMentoringJourneyByMentorQuery(mentorId)

  return (
    <Box maxW="md" marginY="10" padding="5" border="1px" borderColor="gray.200" borderRadius="5px">
      <Flex>
        <Box flex="1">
          {
            mentorInfo?.mentor?.profileImgURL
              ? <Image src={mentorInfo?.mentor?.profileImgURL} borderRadius="100%" maxWidth="100%" width="60px" height="60px" />
              : (
                <Circle size="60px" bg="secondary.100">
                  <Icon name="person" color="secondary.300" fontSize="40px" />
                </Circle>
              )
          }
        </Box>
        <Flex flex="4" justifyContent="flex-start" flexDir="column">
          <Box>
            <Text fontSize="lg" fontWeight="semibold">
              {mentorInfo?.mentor?.firstName} {mentorInfo?.mentor?.lastName}
            </Text>
            <Text fontWeight="bold" fontSize="lg" color="primary.700"> Mentor</Text>
          </Box>

          <Divider marginY="3" />
          <Box maxHeight="400px" overflow="scroll">
            <Text fontWeight="semibold"> Assigned Mentees: </Text>
            {assignedMentees.length === 0 && (<Text color="secondary.500"> No assigned mentees at the moment</Text>)}
            {assignedMentees.map((mentee, index) => (
              <Flex marginY="3" flexDir="column">
                <HStack spacing="10px">
                  {
                    mentee?.profileImgURL
                      ? <Image src={mentee?.profileImgURL} borderRadius="100%" maxWidth="100%" width="50px" height="50px" />
                      : (
                        <Circle size="50px" bg="secondary.100">
                          <Icon name="person" color="secondary.300" fontSize="30px" />
                        </Circle>
                      )
                  }
                  <Text> {mentee?.firstName} {mentee?.lastName}</Text>
                </HStack>
                {index !== assignedMentees.length - 1 && <Divider marginY="4" />}
              </Flex>
            ))}
          </Box>

        </Flex>

      </Flex>
    </Box>
  )
}
export default MentorPairingCard
