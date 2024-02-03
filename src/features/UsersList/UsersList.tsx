import {
  Box, Card, Circle, Flex, Text, Image, HStack, Divider, Accordion, AccordionButton, AccordionItem, AccordionPanel, Hide,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import useBreakpoint from '../../hooks/useBreakpoint'
import { User } from '../../app/services/user/types'
import UserDetails from './UserDetails'
import { Icon } from '../../components'

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
      <Box padding="5">
        <Text fontSize="2xl" fontWeight="600"> {title} </Text>
        <Text color="secondary.500"> {description} </Text>
      </Box>
      <Hide below="md">
        <Divider orientation="horizontal" />
      </Hide>
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
      <Box flex="3" paddingRight="10" paddingTop="10">
        {users?.map((user: User) => {
          const {
            firstName, lastName, profileImgURL, userInformationId,
          } = user
          const isActive = userInformationId === selectedUser?.userInformationId
          return (
            <Card padding="5" marginBottom="8" boxShadow="md" onClick={() => handleSelectedUser(user)} _hover={{ cursor: 'pointer' }} background={isActive ? 'primary.800' : 'white'} color={isActive ? 'white' : 'black'}>
              <HStack spacing="8">
                {
                  profileImgURL
                    ? <Image src={profileImgURL} borderRadius="100%" maxWidth="100%" width="70px" height="70px" />
                    : (
                      <Circle size="80px" bg="secondary.100">
                        <Icon name="person" color="secondary.300" fontSize="50px" />
                      </Circle>
                    )
                }
                <Text fontSize="xl">{firstName} {lastName}</Text>
              </HStack>
            </Card>
          )
        })}
      </Box>
      <Box flex="7" paddingLeft="10" borderLeft="1px" borderColor="secondary.100" paddingTop="10">
        {selectedUser && <UserDetails user={selectedUser} />}
      </Box>
    </Flex>
  )
}

function UsersListMobile(props: Props) {
  const { users } = props
  return (
    <Box marginX="4">
      <Accordion allowMultiple>
        {users.map((user) => (
          <AccordionItem marginBottom="8" borderColor="white" boxShadow="md">
            {({ isExpanded }) => {
              const bgColor = isExpanded ? 'primary.800' : 'white'
              const textColor = isExpanded ? 'white' : 'black'
              return (
                <>
                  <AccordionButton paddingY="4" background={bgColor} _hover={{ background: bgColor }} color={textColor}>
                    <Flex justifyContent="space-between" alignItems="center" width="100%">
                      <HStack spacing="5">
                        {
                          user.profileImgURL
                            ? <Image src={user.profileImgURL} borderRadius="100%" maxWidth="100%" width="60px" height="60px" />
                            : (
                              <Circle size="60px" bg="secondary.100">
                                <Icon name="person" color="secondary.300" fontSize="40px" />
                              </Circle>
                            )
                        }
                        <Text fontSize="xl">
                          {user.firstName} {user.lastName}
                        </Text>
                      </HStack>
                      {isExpanded ? (
                        <Icon name="remove" fontWeight="200" fontSize="28px" color="white" />
                      ) : (
                        <Icon name="add" fontWeight="200" fontSize="28px" />
                      )}
                    </Flex>
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <UserDetails
                      user={user}
                    />
                  </AccordionPanel>
                </>
              )
            }}
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  )
}

export default UsersList
