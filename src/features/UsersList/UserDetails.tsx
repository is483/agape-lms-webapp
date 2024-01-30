import {
  Text, Flex, Image, Circle, HStack,
} from '@chakra-ui/react'
import { User } from '../../app/services/user/types'
import { Icon } from '../../components'

interface UserDetailsProps {
  user: User
}

function UserDetails(props: UserDetailsProps) {
  const {
    user: {
      firstName, lastName, dateOfBirth, gender, phoneNumber, profileImgURL,
    },
  } = props
  const formattedDateOfBirth = new Date(dateOfBirth).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <Flex flexDirection="column">
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
      <HStack spacing="20">
        <HStack>
          <Icon name="calendar_month" color="secondary.300" fontSize="30px" />
          <Text color="secondary.300" fontSize="lg"> {formattedDateOfBirth}</Text>
        </HStack>
        <HStack>
          <Icon name={gender === 'M' ? 'man' : 'woman'} color="secondary.300" fontSize="30px" />
          <Text color="secondary.300" fontSize="lg"> {gender === 'M' ? 'Male' : 'Female'}</Text>
        </HStack>
        <HStack>
          <Icon name="email" color="secondary.300" fontSize="30px" />
          <Text color="secondary.300" fontSize="lg"> Placeholder</Text>
        </HStack>
        <HStack>
          <Icon name="phone_iphone" color="secondary.300" fontSize="30px" />
          <Text color="secondary.300" fontSize="lg"> {phoneNumber}</Text>
        </HStack>
      </HStack>
    </Flex>

  )
}
export default UserDetails
