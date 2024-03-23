import {
  Box, Divider, Flex, Text, HStack, Circle, Image, Hide,
} from '@chakra-ui/react'
import { Container, Icon } from '../../components'
import { useGetUnAssignedMenteesAdminQuery } from '../../app/services/user/apiUserSlice'
import MentorMenteePairings from './components/MentorPairings'

function Pairing() {
  const { data: unAssignedMenteesData } = useGetUnAssignedMenteesAdminQuery(null)

  return (
    <Container minHeight="calc(100vh - 32px)">
      <Box padding="5">
        <Text fontSize="2xl" fontWeight="600"> Pairing of Mentors and Mentees </Text>
        <Text color="secondary.500"> Utilize this section to assign mentees to mentors, crafting the ideal pairing</Text>
      </Box>
      <Divider />
      <Flex>
        <Box flex="3">
          <MentorMenteePairings />
        </Box>
        <Hide below="md">
          <Box flex="2">
            <Text mt="5" fontWeight="bold" fontSize="xl"> Unassigned Mentees ({unAssignedMenteesData?.length})</Text>
            {unAssignedMenteesData?.length === 0 && (
              <Text> All mentees have been assigned a mentor!</Text>
            )}
            {unAssignedMenteesData?.map((mentee) => {
              const { profileImgURL, firstName, lastName } = mentee
              return (
                <Box>
                  <HStack marginY="5" spacing="10px">
                    {
                      profileImgURL
                        ? <Image src={profileImgURL} borderRadius="100%" maxWidth="100%" width="50px" height="50px" />
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
