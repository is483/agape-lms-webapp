import {
  Text, Flex, HStack, Box, SimpleGrid, Divider, Hide, Badge,
} from '@chakra-ui/react'
import { User } from '../../app/services/user/types'
import { Icon, ProfileIcon } from '../../components'

interface UserDetailsProps {
  user: User
}

function UserDetails(props: UserDetailsProps) {
  const {
    user: {
      firstName, lastName, dateOfBirth, gender, phoneNumber, email, profileImgURL, workExperience, careerAspiration, skills, personalValues, preferredCommunication, preferredMeetingDays, challenges, interests, expectations,
    },
  } = props

  function mapUserDetails(userDetails: string) {
    const stringArr = userDetails?.split(',').map((detail: string) => detail.trim())
    return stringArr
  }

  const formattedDateOfBirth = new Date(dateOfBirth).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  const validWorkExperiences = JSON.parse(workExperience)?.filter(
    (work: { company: string; jobTitle: string; description: string }) => (work.company.length && work.jobTitle.length && work.description.length),
  ) ?? []

  return (
    <Flex flexDirection="column" minHeight="100vh" wrap="wrap" maxWidth="100%">
      <Hide below="lg">
        <HStack spacing={[4, null, null, 8]} marginBottom="10">
          <ProfileIcon imgUrl={profileImgURL} width={['70px', null, null, '120px']} height={['70px', null, null, '120px']} iconProps={{ fontSize: ['50px', null, null, '80px'] }} />
          <Text fontSize={['lg', null, 'xl']}>
            {firstName} {lastName}
          </Text>
        </HStack>
      </Hide>
      <Flex
        direction={['column', 'column', 'column', 'row']}
        marginBottom="10"
        marginTop={['10', null, '0']}
        justifyContent="space-between"
        wrap="wrap"
      >
        <HStack marginBottom={['4', null, null, '0']} marginRight="5">
          <Icon name="calendar_month" color="secondary.300" fontSize="30px" />
          <Text color="secondary.300" fontSize="md" isTruncated>
            {formattedDateOfBirth}
          </Text>
        </HStack>
        <HStack marginBottom={['4', null, null, '0']} marginRight="5">
          <Icon name={gender === 'M' ? 'man' : 'woman'} color="secondary.300" fontSize="30px" />
          <Text color="secondary.300" fontSize="md" isTruncated>
            {gender === 'M' ? 'Male' : 'Female'}
          </Text>
        </HStack>
        <HStack marginBottom={['4', null, null, '0']} marginRight="5">
          <Icon name="email" color="secondary.300" fontSize="30px" />
          <Text color="secondary.300" fontSize="md" isTruncated>
            {email}
          </Text>
        </HStack>
        <HStack>
          <Icon name="phone_iphone" color="secondary.300" fontSize="30px" />
          <Text color="secondary.300" fontSize="md" isTruncated>
            {phoneNumber}
          </Text>
        </HStack>
      </Flex>
      <Divider orientation="horizontal" marginBottom="4" />
      <Box marginBottom="10">
        <Text fontWeight="600" fontSize="xl" marginBottom="3"> Work Experience </Text>
        {validWorkExperiences.length ? validWorkExperiences.map((work: { company: string; jobTitle: string; description: string }, index: number) => (
          <Box>
            <Box marginBottom={index === JSON.parse(workExperience).length - 1 ? '0' : '50'}>
              <Text marginBottom="1"> {work.company} - {work.jobTitle}</Text>
              <Text> {work.description} </Text>
            </Box>
          </Box>
        )) : <Text>No work experience</Text>}
      </Box>
      <Divider orientation="horizontal" marginBottom="4" />
      <SimpleGrid columns={[1, 1, 1, 2, 3]} spacing="8">
        <Box>
          <Text fontWeight="600" fontSize="md" marginBottom="2">Career Aspirations</Text>
          <Badge
            colorScheme="red"
            mr="2"
          > {careerAspiration}
          </Badge>
        </Box>

        <Box>
          <Text fontWeight="600" fontSize="md" marginBottom="2">Skills Sought</Text>
          {mapUserDetails(skills)?.map((skill) => (
            <Badge
              colorScheme="red"
            >
              {skill}
            </Badge>
          ))}
        </Box>

        <Box>
          <Text fontWeight="600" fontSize="md" marginBottom="2">Personal Values</Text>
          {mapUserDetails(personalValues)?.map((value) => (
            <Badge
              colorScheme="red"
              mr="2"
            >
              {value}
            </Badge>
          ))}
        </Box>

        <Box>
          <Text fontWeight="600" fontSize="md" marginBottom="2">Preferred Communication</Text>
          <Badge
            colorScheme="red"
            mr="2"
          > {preferredCommunication}
          </Badge>
        </Box>

        <Box>
          <Text fontWeight="600" fontSize="md" marginBottom="2">Preferred Meeting Days</Text>
          {mapUserDetails(preferredMeetingDays)?.map((meetingDay) => (
            <Badge
              colorScheme="red"
              mr="2"
            >
              {meetingDay}
            </Badge>
          ))}
        </Box>

        <Box>
          <Text fontWeight="600" fontSize="md" marginBottom="2">Mentoring Expectations</Text>
          <Text> {expectations}</Text>
        </Box>

        <Box>
          <Text fontWeight="600" fontSize="md" marginBottom="2">Challenges Faced</Text>
          {mapUserDetails(challenges)?.map((challenge) => (
            <Badge
              colorScheme="red"
              mr="2"
            >
              {challenge}
            </Badge>
          ))}
        </Box>

        <Box>
          <Text fontWeight="600" fontSize="md" marginBottom="2">Interests</Text>
          {mapUserDetails(interests)?.map((interest) => (
            <Badge
              colorScheme="red"
              mr="2"
            >
              {interest}
            </Badge>
          ))}
        </Box>
      </SimpleGrid>
    </Flex>
  )
}
export default UserDetails
