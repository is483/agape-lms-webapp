import {
  Container, Text,
} from '@chakra-ui/react'
import { User } from '../../app/services/user/types'

interface UserDetailsProps {
  user: User
}

function UserDetails(props: UserDetailsProps) {
  const { user } = props

  return (
    <Container>
      <Text>{user?.firstName}</Text>
    </Container>
  )
}
export default UserDetails
