import {
  Box, Card, Circle, Flex, Icon, Text, Image, HStack, Divider,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import useBreakpoint from '../../hooks/useBreakpoint'
import { User } from '../../app/services/user/types'
import UserDetails from './UserDetails'

interface UsersListProps {
  title: string
  description: string
  users: User[]
}

interface Props {
  users: User[]
}

function UsersList(props: UsersListProps) {
  const { title, description, users } = props
  const isMdUp = useBreakpoint('md')
  const UsersListComponent = isMdUp ? UsersListDesktop : UsersListMobile
  return (
    <Box>
      <Box marginBottom="45">
        <Box marginBottom="5">
          <Text fontSize="2xl" fontWeight="600"> {title} </Text>
          <Text color="secondary.500"> {description} </Text>
        </Box>
        <Divider orientation="horizontal" />
      </Box>
      {users.length > 0 && <UsersListComponent users={users} />}
      {users.length === 0 && <NoUserList />}

    </Box>

  )
}

function NoUserList() {
  return (
    <Text>No Users </Text>
  )
}
function UsersListDesktop(props: Props) {
  const { users } = props
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleSelectedUser = (user: User) => {
    setSelectedUser(user)
  }

  useEffect(() => {
    if (users.length > 0) {
      setSelectedUser(users[0])
    }
  }, [users])

  return (
    <Flex minHeight="100vh">
      <Box flex="3">
        {users?.map((user: User) => {
          const {
            firstName, lastName, profileImgURL, userInformationId,
          } = user
          const isActive = userInformationId === selectedUser?.userInformationId
          return (
            <Card padding="5" onClick={() => handleSelectedUser(user)} _hover={{ cursor: 'pointer' }} background={isActive ? 'primary.800' : 'white'} color={isActive ? 'white' : 'black'}>
              <HStack spacing="8">
                {
                  profileImgURL
                    ? <Image src={profileImgURL} borderRadius="100%" maxWidth="100%" width="70px" height="70px" />
                    : (
                      <Circle size="140px" bg="secondary.100">
                        <Icon name="person" color="secondary.300" fontSize="100px" />
                      </Circle>
                    )
                }
                <Text fontSize="xl">{firstName} {lastName}</Text>
              </HStack>
            </Card>
          )
        })}
      </Box>
      <Box flex="1" />
      <Box flex="7">
        {selectedUser && <UserDetails user={selectedUser} />}
      </Box>
    </Flex>
  )
}

function UsersListMobile(props: Props) {
  const { users } = props
  return (
    <>
    </>
  )
}

export default UsersList
