import {
  Text, Flex, Image, Circle, HStack, Box, SimpleGrid, Divider,
} from '@chakra-ui/react'
import { User } from '../../app/services/user/types'
import { Icon } from '../../components'

interface UserDetailsProps {
  user: User
}

function UserDetails(props: UserDetailsProps) {
  const {
    user: {
      firstName, lastName, dateOfBirth, gender, phoneNumber, profileImgURL, workExperience, careerAspiration, skills, personalValues, preferredCommunication, preferredMeetingDays, challenges, interests, expectations,
    },
  } = props

  function mapUserDetails(userDetails: string) {
    const stringArr = userDetails.split(',').map((detail: string) => detail.trim())
    return stringArr
  }

  const formattedDateOfBirth = new Date(dateOfBirth).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <HStack spacing="20" marginBottom="10">
        {
          profileImgURL
            ? <Image src={profileImgURL} borderRadius="100%" maxWidth="100%" width="120px" height="120px" />
            : (
              <Circle size="140px" bg="secondary.100">
                <Icon name="person" color="secondary.300" fontSize="100px" />
              </Circle>
            )
        }
        <Text fontSize="4xl">
          {firstName} {lastName}
        </Text>
      </HStack>
      <SimpleGrid columns={[1, null, 4]} marginBottom="10">
        <HStack>
          <Icon name="calendar_month" color="secondary.300" fontSize="30px" />
          <Text color="secondary.300" fontSize="lg">{formattedDateOfBirth}</Text>
        </HStack>
        <HStack>
          <Icon name={gender === 'M' ? 'man' : 'woman'} color="secondary.300" fontSize="30px" />
          <Text color="secondary.300" fontSize="lg">{gender === 'M' ? 'Male' : 'Female'}</Text>
        </HStack>
        <HStack>
          <Icon name="email" color="secondary.300" fontSize="30px" />
          <Text color="secondary.300" fontSize="lg">Placeholder</Text>
        </HStack>
        <HStack>
          <Icon name="phone_iphone" color="secondary.300" fontSize="30px" />
          <Text color="secondary.300" fontSize="lg">{phoneNumber}</Text>
        </HStack>
      </SimpleGrid>
      <Divider orientation="horizontal" marginBottom="10" />
      <Box marginBottom="20">
        <Text fontWeight="600" fontSize="xl"> Work Experience </Text>
        {JSON.parse(workExperience).map((work: { company: string; jobTitle: string; description: string; }) => (
          <Box>
            <Text> {work.company} {work.jobTitle}</Text>
            <Text> {work.description} </Text>
          </Box>
        ))}
      </Box>
      <Divider orientation="horizontal" marginBottom="10" />
      <SimpleGrid columns={[1, 2, 3]} spacing="10">
        <Box>
          <Text fontWeight="600" fontSize="xl" marginBottom="5">Career Aspirations</Text>
          <Box
            borderRadius="10px"
            border="1px"
            borderColor="red.500"
            color="red.500"
            paddingY="2"
            paddingX="5"
            display="inline-block"
          > {careerAspiration}
          </Box>
        </Box>

        <Box>
          <Text fontWeight="600" fontSize="xl" marginBottom="5">Skills Sought</Text>
          {mapUserDetails(skills).map((skill) => (
            <Box
              borderRadius="10px"
              border="1px"
              borderColor="red.500"
              color="red.500"
              py="2"
              px="5"
              display="inline-block"
              marginRight="2"
              marginBottom="2"
            >
              {skill}
            </Box>
          ))}
        </Box>

        <Box>
          <Text fontWeight="600" fontSize="xl" marginBottom="5">Personal Values</Text>
          {mapUserDetails(personalValues).map((value) => (
            <Box
              borderRadius="10px"
              border="1px"
              borderColor="red.500"
              color="red.500"
              py="2"
              px="5"
              display="inline-block"
              marginRight="2"
              marginBottom="2"
            >
              {value}
            </Box>
          ))}
        </Box>

        <Box>
          <Text fontWeight="600" fontSize="xl" marginBottom="5">Preferred Communication</Text>
          <Box
            borderRadius="10px"
            border="1px"
            borderColor="red.500"
            color="red.500"
            paddingY="2"
            paddingX="5"
            display="inline-block"
          > {preferredCommunication}
          </Box>
        </Box>

        <Box>
          <Text fontWeight="600" fontSize="xl" marginBottom="5">Preferred Meeting Days</Text>
          {mapUserDetails(preferredMeetingDays).map((meetingDay) => (
            <Box
              borderRadius="10px"
              border="1px"
              borderColor="red.500"
              color="red.500"
              py="2"
              px="5"
              display="inline-block"
              marginRight="2"
              marginBottom="2"
            >
              {meetingDay}
            </Box>
          ))}
        </Box>

        <Box>
          <Text fontWeight="600" fontSize="xl" marginBottom="5">Mentoring Expectations</Text>
          <Text> {expectations}</Text>
        </Box>

        <Box>
          <Text fontWeight="600" fontSize="xl" marginBottom="5">Challenges Faced</Text>
          {mapUserDetails(challenges).map((challenge) => (
            <Box
              borderRadius="10px"
              border="1px"
              borderColor="red.500"
              color="red.500"
              py="2"
              px="5"
              display="inline-block"
              marginRight="2"
              marginBottom="2"
            >
              {challenge}
            </Box>
          ))}
        </Box>

        <Box>
          <Text fontWeight="600" fontSize="xl" marginBottom="5">Interests</Text>
          {mapUserDetails(interests).map((interest) => (
            <Box
              borderRadius="10px"
              border="1px"
              borderColor="red.500"
              color="red.500"
              py="2"
              px="5"
              display="inline-block"
              marginRight="2"
              marginBottom="2"
            >
              {interest}
            </Box>
          ))}
        </Box>
      </SimpleGrid>
    </Flex>

  )
}
export default UserDetails
