import {
  Box, Circle, Image, Flex, Text, Divider, HStack, Button, useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { MentorsAdminResponse } from '../../../app/services/user/types'
import { useGetMenteesWithNoMentoringJourneyByMentorQuery } from '../../../app/services/user/apiUserSlice'
import { Icon } from '../../../components'
import UnAssignMenteeModal from './UnAssignMenteeModal'
import AssignMenteeModal from './AssignMenteeModal'

interface MentorMenteePairingProps {
  mentorInfo: MentorsAdminResponse
  isUnassignedMenteesEmpty: boolean
}

function MentorPairingCard(props: MentorMenteePairingProps) {
  const { mentorInfo, isUnassignedMenteesEmpty } = props
  const assignedMentees = mentorInfo?.assignedMentees
  const mentorId = mentorInfo.mentor.userId
  const { isOpen: isUnAssignModalOpen, onOpen: onUnAssignModalOpen, onClose: onUnAssignModalClose } = useDisclosure()
  const { isOpen: isAssignModalOpen, onOpen: onAssignModalOpen, onClose: onAssignModalModalClose } = useDisclosure()
  const { data } = useGetMenteesWithNoMentoringJourneyByMentorQuery(mentorId)
  const [menteeId, setMenteeId] = useState<number | string | undefined>()

  const openDeleteModal = (id: number | string) => {
    setMenteeId(id)
    onUnAssignModalOpen()
  }
  return (
    <Box maxW="lg" marginY="10" padding="5" border="1px" borderColor="gray.200" borderRadius="5px">
      <UnAssignMenteeModal isModalOpen={isUnAssignModalOpen} onModalClose={onUnAssignModalClose} menteeId={menteeId ?? ''} />
      <AssignMenteeModal isModalOpen={isAssignModalOpen} onModalClose={onAssignModalModalClose} mentorId={mentorId} />
      <Flex gap="4">
        <Box flex="1">
          {
            mentorInfo?.mentor?.profileImgUrl
              ? <Image src={mentorInfo?.mentor?.profileImgUrl} borderRadius="100%" maxWidth="100%" width="60px" height="60px" />
              : (
                <Circle size="60px" bg="secondary.100">
                  <Icon name="person" color="secondary.300" fontSize="40px" />
                </Circle>
              )
          }
        </Box>
        <Flex flex="5" justifyContent="flex-start" flexDir="column">
          <Box>
            <Text fontSize="lg" fontWeight="semibold">
              {mentorInfo?.mentor?.firstName} {mentorInfo?.mentor?.lastName}
            </Text>
            <Text fontWeight="bold" fontSize="lg" color="primary.700"> Mentor</Text>
          </Box>

          <Divider marginY="3" />
          <Box maxHeight="350px" overflow="scroll" paddingRight="2">
            <Flex justifyContent="space-between" alignItems="center" mb="7">
              <Text fontWeight="semibold"> Assigned Mentees: </Text>
              <Button size="xs" colorScheme="red" isDisabled={isUnassignedMenteesEmpty} onClick={onAssignModalOpen}>+ Add Mentee</Button>
            </Flex>
            {assignedMentees.length === 0 && (<Text color="secondary.500"> No assigned mentees at the moment</Text>)}
            {assignedMentees.map((mentee, index) => (
              <Flex marginY="3" flexDir="column">
                <HStack spacing="10px" justifyContent="space-between">
                  <Flex alignItems="center" gap={3}>
                    {
                      mentee?.profileImgUrl
                        ? <Image src={mentee?.profileImgUrl} borderRadius="100%" maxWidth="100%" width="50px" height="50px" />
                        : (
                          <Circle size="50px" bg="secondary.100">
                            <Icon name="person" color="secondary.300" fontSize="30px" />
                          </Circle>
                        )
                    }
                    <Text> {mentee?.firstName} {mentee?.lastName}</Text>
                  </Flex>
                  <Button px="0" rounded="full" isDisabled={data && !data?.unassignedMentees.some((unassignedMentee) => unassignedMentee.menteeId === mentee.userId)} onClick={() => openDeleteModal(mentee?.userId)}>
                    <Icon name="delete" fontSize="25px" />
                  </Button>
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
