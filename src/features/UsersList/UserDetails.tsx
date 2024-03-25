import {
  Text, Flex, HStack, Box, SimpleGrid, Divider, Hide, Badge, Button, useDisclosure,
} from '@chakra-ui/react'
import { User } from '../../app/services/user/types'
import { Icon, ProfileIcon } from '../../components'
import { Role } from '../../app/types'
import DeleteUserModal from '../AdminPairing/components/DeleteUserModal'

interface UserDetailsProps {
  user: User
  userRole: Role
  toHide?: boolean
  isMobile?: boolean
}

function UserDetails(props: UserDetailsProps) {
  const {
    user: {
      userId, firstName, lastName, dateOfBirth, gender,
      phoneNumber, email, profileImgUrl, workExperience, careerAspiration,
      skills, personalValues, preferredCommunication, preferredMeetingDays,
      challenges, interests, expectations, preferredMentoringApproach,
    },
    userRole,
    toHide,
    isMobile,
  } = props

  function mapUserDetails(userDetails: string) {
    const stringArr = userDetails?.split(',').map((detail: string) => detail.trim())
    return stringArr
  }
  const formattedDateOfBirth = new Date(dateOfBirth).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const validWorkExperiences = JSON.parse(workExperience)?.filter(
    (work: { company: string; jobTitle: string; description: string }) => (work.company.length && work.jobTitle.length && work.description.length),
  ) ?? []

  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure()

  return (
    <Flex flexDirection="column" minHeight="100vh" wrap="wrap" maxWidth="100%">
      <DeleteUserModal isModalOpen={isDeleteModalOpen} onModalClose={onDeleteModalClose} userId={userId} />
      <Hide below="lg">
        <Flex justifyContent="space-between" alignItems="center">
          <HStack spacing={[4, null, null, 8]} marginBottom="10">
            <ProfileIcon imgUrl={profileImgUrl} width={['70px', null, null, '120px']} height={['70px', null, null, '120px']} iconProps={{ fontSize: ['50px', null, null, '80px'] }} />
            <Text fontSize={['lg', null, 'xl']}>
              {firstName} {lastName}
            </Text>
          </HStack>
          {
            (!toHide && userRole === 'Admin') && (
              <Button px="0" rounded="full" size="lg" onClick={onDeleteModalOpen}>
                <Icon name="delete" fontSize="30px" />
              </Button>
            )
          }

        </Flex>

      </Hide>
      <Flex
        direction={isMobile ? 'column' : ['column', 'column', 'column', 'row']}
        marginBottom="4"
        marginTop={['10', null, '0']}
        // justifyContent="space-between"
        wrap="wrap"
      >
        <HStack marginBottom={['4', null, null, '0']} marginRight="5">
          <Icon name="calendar_month" color="secondary.300" fontSize="20px" />
          <Text color="secondary.300" fontSize="md" isTruncated>
            {formattedDateOfBirth}
          </Text>
        </HStack>
        <HStack marginBottom={['4', null, null, '0']} marginRight="5">
          <Icon name={gender === 'M' ? 'man' : 'woman'} color="secondary.300" fontSize="20px" />
          <Text color="secondary.300" fontSize="md" isTruncated>
            {gender === 'M' ? 'Male' : 'Female'}
          </Text>
        </HStack>
        <HStack marginBottom={['4', null, null, '0']} marginRight="5">
          <Icon name="email" color="secondary.300" fontSize="20px" />
          <Text color="secondary.300" fontSize="md" isTruncated>
            {email}
          </Text>
        </HStack>
        <HStack>
          <Icon name="phone_iphone" color="secondary.300" fontSize="20px" />
          <Text color="secondary.300" fontSize="md" isTruncated>
            {phoneNumber}
          </Text>
        </HStack>
      </Flex>
      <Divider orientation="horizontal" marginBottom="4" />
      <Box marginBottom="4">
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
      <SimpleGrid columns={isMobile ? 1 : [1, 1, 1, 2, 3]} spacing="8">
        {userRole === 'Mentee'
          && (
            <Box>
              <Text fontWeight="600" fontSize="md" marginBottom="2">Career Aspirations</Text>
              <Badge
                colorScheme="red"
                mr="2"
              > {careerAspiration}
              </Badge>
            </Box>
          )}

        <Box>
          <Text fontWeight="600" fontSize="md" marginBottom="2">{userRole === 'Mentee' ? 'Skills Sought' : 'Specialized Skills'}</Text>
          {mapUserDetails(skills)?.map((skill) => (
            <Badge
              colorScheme="red"
              mr="2"
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

        {userRole === 'Mentee' && (
          <Box>
            <Text fontWeight="600" fontSize="md" marginBottom="2">Mentoring Expectations</Text>
            <Text>{expectations}</Text>
          </Box>
        )}

        {userRole === 'Mentor' && (
          <Box>
            <Text fontWeight="600" fontSize="md" marginBottom="2">Mentoring Style</Text>
            {mapUserDetails(preferredMentoringApproach!)?.map((mentoringApproach) => (
              <Badge
                colorScheme="red"
                mr="2"
              >
                {mentoringApproach}
              </Badge>
            ))}
          </Box>
        )}

        <Box>
          <Text fontWeight="600" fontSize="md" marginBottom="2">{userRole === 'Mentee' ? 'Challenges Faced' : 'Challenges Overcame'}</Text>
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
UserDetails.defaultProps = {
  toHide: false,
  isMobile: false,
}
export default UserDetails
