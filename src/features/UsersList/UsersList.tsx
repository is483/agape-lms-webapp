import {
  Box, Card, Circle, Flex, Text, Image, HStack, Divider, Accordion, AccordionButton, AccordionItem, AccordionPanel, Hide, Input, InputGroup, InputLeftElement,
} from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useBreakpoint from '../../hooks/useBreakpoint'
import { User } from '../../app/services/user/types'
import UserDetails from './UserDetails'
import { Icon, ProfileIcon } from '../../components'
import { Role } from '../../app/types'

interface UsersListProps {
  title: string
  description: string
  users: User[]
  userRole: Role
}

interface Props {
  users: User[]
  userRole: Role
  name: string
}

function UsersList(props: UsersListProps) {
  const {
    title, description, users, userRole,
  } = props
  const isMdUp = useBreakpoint('md')
  const [searchTerm, setSearchTerm] = useState('')
  const UsersListComponent = isMdUp ? UsersListDesktop : UsersListMobile

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }
  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center">
        <Box padding="5">
          <Text fontSize="2xl" fontWeight="600"> {title} </Text>
          <Text color="secondary.500"> {description} </Text>
        </Box>

        <Hide below="md">
          <Box maxW="lg">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon color="secondary.500" name="search" />
              </InputLeftElement>
              <Input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search by name" />
            </InputGroup>
          </Box>

        </Hide>
      </Flex>

      <Hide below="md">
        <Divider orientation="horizontal" />
      </Hide>
      {users.length > 0 && <UsersListComponent users={users} userRole={userRole} name={searchTerm} />}
      {users.length === 0 && (
        <Box padding="5">
          <Text> Oops, you do not have any assigned mentees at the moment. Check back again or contact Agape!</Text>
        </Box>
      )}
    </Box>
  )
}

function UsersListDesktop(props: Props) {
  const { users, userRole, name } = props
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { userId } = useParams()
  const handleSelectedUser = (user: User) => {
    setSelectedUser(user)
  }

  useEffect(() => {
    // TODO: fix logic so this works across different user types
    if (userId) {
      const user = users.find((user) => user.userId === Number(userId) || user.menteeId === Number(userId))
      if (user) {
        setSelectedUser(user)
      }
    } else if (users.length > 0) {
      setSelectedUser(users[0])
    }
  }, [users, userId])

  const filteredUsers = users.filter((user) => `${user.firstName} ${user.lastName}`.toLowerCase().includes(name.toLowerCase()))
  return (
    <Flex>
      <Box width="280px">
        {filteredUsers?.map((user: User) => {
          const {
            firstName, lastName, profileImgUrl, userInformationId,
          } = user
          const isActive = userInformationId === selectedUser?.userInformationId
          return (
            <Card m="2" ml="0" padding="3" rounded="0" border="1px solid" borderColor="secondary.100" shadow="none" onClick={() => handleSelectedUser(user)} _hover={{ cursor: 'pointer' }} background={isActive ? 'primary.800' : 'white'} color={isActive ? 'white' : 'black'}>
              <HStack spacing="4">
                <ProfileIcon imgUrl={profileImgUrl} width="55px" height="55px" iconProps={{ fontSize: '30px' }} />
                <Text fontSize="lg">{firstName} {lastName}</Text>
              </HStack>
            </Card>
          )
        })}
      </Box>
      <Box flex="1" paddingLeft="10" borderLeft="1px" borderColor="secondary.100" paddingTop="8">
        {selectedUser && <UserDetails user={selectedUser} userRole={userRole} />}
      </Box>
    </Flex>
  )
}

function UsersListMobile(props: Props) {
  const { users, userRole, name } = props
  const filteredUsers = users.filter((user) => `${user.firstName} ${user.lastName}`.toLowerCase().includes(name.toLowerCase()))

  return (
    <Box marginX="4">
      <Accordion allowMultiple>
        {filteredUsers.map((user) => (
          <AccordionItem marginBottom="2" borderColor="white" boxShadow="md" borderRadius="10">
            {({ isExpanded }) => {
              const bgColor = isExpanded ? 'primary.800' : 'white'
              const textColor = isExpanded ? 'white' : 'black'
              return (
                <>
                  <AccordionButton paddingY="4" background={bgColor} _hover={{ background: bgColor }} color={textColor} borderRadius="10">
                    <Flex justifyContent="space-between" alignItems="center" width="100%">
                      <HStack spacing="5">
                        {
                          user.profileImgUrl
                            ? <Image src={user.profileImgUrl} borderRadius="100%" maxWidth="100%" width="60px" height="60px" />
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
                  <AccordionPanel pb={4} background="white" borderRadius="10">
                    <UserDetails
                      user={user}
                      userRole={userRole}
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
