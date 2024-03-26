import {
  Box, Divider, Flex, Text, HStack, Circle, Image, Hide, InputGroup, InputLeftElement, Input,
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { Container, Icon } from '../../components'
import { useGetAllMentorsAdminQuery, useGetUnAssignedMenteesAdminQuery } from '../../app/services/user/apiUserSlice'
import MentorPairingCard from './components/MentorPairingCard'
import { MentorsAdminResponse } from '../../app/services/user/types'

function Pairing() {
  const { data: unAssignedMenteesData } = useGetUnAssignedMenteesAdminQuery(null)
  const { data: allMentorData } = useGetAllMentorsAdminQuery(null)
  const [searchTerm, setSearchTerm] = useState('')
  const isUnassignedMenteesEmpty = !unAssignedMenteesData || unAssignedMenteesData.length === 0

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }
  const filteredMentorData = allMentorData?.filter((mentor: MentorsAdminResponse) => `${mentor.mentor.firstName} ${mentor.mentor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Container minHeight="calc(100vh - 32px)">
      <Box padding="5">
        <Text fontSize="2xl" fontWeight="600"> Pairing of Mentors and Mentees </Text>
        <Text color="secondary.500"> Utilize this section to assign mentees to mentors, crafting the ideal pairing</Text>
      </Box>
      <Divider />
      <Flex padding="5">
        <Box flex="4">
          <Text>Note: You cannot unpair mentor-mentee pairs that already have a mentoring journey created.</Text>
          <Text marginY="5" fontWeight="bold" fontSize="xl"> Mentors ({allMentorData?.length})</Text>
          <Box maxW="lg">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon color="secondary.500" name="search" />
              </InputLeftElement>
              <Input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search by mentor name" />
            </InputGroup>
          </Box>

          {filteredMentorData?.map((mentorData: MentorsAdminResponse) => (
            <MentorPairingCard mentorInfo={mentorData} isUnassignedMenteesEmpty={isUnassignedMenteesEmpty} />
          ))}
        </Box>
        <Hide below="md">
          <Box flex="2" maxHeight="600px" overflow="scroll">
            <Text mt="5" fontWeight="bold" fontSize="xl"> Unassigned Mentees ({unAssignedMenteesData?.length})</Text>
            {unAssignedMenteesData?.length === 0 && (
              <Text> All mentees have been assigned a mentor!</Text>
            )}
            {unAssignedMenteesData?.map((mentee) => {
              const { profileImgUrl, firstName, lastName } = mentee
              return (
                <Box>
                  <HStack marginY="5" spacing="10px">
                    {
                      profileImgUrl
                        ? <Image src={profileImgUrl} borderRadius="100%" maxWidth="100%" width="50px" height="50px" />
                        : (
                          <Circle size="50px" bg="secondary.100">
                            <Icon name="person" color="secondary.300" fontSize="30px" />
                          </Circle>
                        )
                    }
                    <Text fontSize="lg"> {firstName} {lastName}</Text>
                  </HStack>
                </Box>
              )
            })}
          </Box>
        </Hide>
      </Flex>
    </Container>
  )
}

export default Pairing
