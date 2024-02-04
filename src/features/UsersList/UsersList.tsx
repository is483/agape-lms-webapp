import {
  Box, Card, Circle, Flex, Text, Image, HStack, Divider, Accordion, AccordionButton, AccordionItem, AccordionPanel, Hide,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useBreakpoint from '../../hooks/useBreakpoint'
import { User } from '../../app/services/user/types'
import UserDetails from './UserDetails'
import { Icon, ProfileIcon } from '../../components'

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
    </Box>
  )
}

function UsersListDesktop(props: Props) {
  const { users } = props
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { userId } = useParams()
  const handleSelectedUser = (user: User) => {
    setSelectedUser(user)
  }

  useEffect(() => {
    // TODO: fix logic so this works across different user types
    if (userId) {
      const user = users.find((user) => user.menteeId === Number(userId))
      if (user) {
        setSelectedUser(user)
      }
    } else if (users.length > 0) {
      setSelectedUser(users[0])
    }
  }, [users, userId])

  return (
    <Flex>
      <Box paddingRight="4" paddingTop="4" width="280px">
        {users?.map((user: User) => {
          const {
            firstName, lastName, profileImgURL, userInformationId,
          } = user
          const isActive = userInformationId === selectedUser?.userInformationId
          return (
            <Card padding="3" marginBottom="4" boxShadow="md" onClick={() => handleSelectedUser(user)} _hover={{ cursor: 'pointer' }} background={isActive ? 'primary.800' : 'white'} color={isActive ? 'white' : 'black'}>
              <HStack spacing="4">
                <ProfileIcon imgUrl={profileImgURL} width="55px" height="55px" iconProps={{ fontSize: '30px' }} />
                <Text fontSize="lg">{firstName} {lastName}</Text>
              </HStack>
            </Card>
          )
        })}
      </Box>
      <Box flex="1" paddingLeft="10" borderLeft="1px" borderColor="secondary.100" paddingTop="8">
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
                  <AccordionPanel pb={4} background="white" borderRadius="10">
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
