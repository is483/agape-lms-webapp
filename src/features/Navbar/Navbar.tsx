import {
  Box, Button, Image, Text,
} from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { Role } from '../../app/types'
import { navbarLinksRecord } from './constants'
import { Icon } from '../../components'

interface Props {
  role: Role
}

function Navbar(props: Props) {
  const { role } = props
  const navbarLinks = navbarLinksRecord[role!]
  const location = useLocation()
  const navigate = useNavigate()
  const { pathname } = location

  const handleNavClick = useCallback((path: string) => {
    navigate(path)
  }, [navigate])

  return (
    <Box
      background="white"
      width="280px"
      height="100%"
      position="fixed"
      display="flex"
      alignItems="center"
      flexDirection="column"
      gap="2rem"
      padding="2rem"
    >
      <Image src="https://i.pravatar.cc/" borderRadius="100%" maxWidth="100%" width="200px" height="200px" marginTop="2.5rem" />
      <Text fontSize="xl" fontWeight="700" wordBreak="break-all" color="red.700">
        Name Placeholder
      </Text>
      <Box display="flex" gap="2rem" flexDirection="column" width="100%">
        {navbarLinks.map(({ title, links }) => (
          <Box key={title} display="flex" gap="0.5rem" flexDirection="column">
            <Text fontWeight="bold" marginLeft="1rem" fontSize="xs" textTransform="uppercase">{title}</Text>
            {links.map(({ name, iconName, path }) => {
              const isPath = path === pathname.toLowerCase()
              const color = {
                ...(!isPath && { color: 'secondary.500' }),
              }
              return (
                <Button
                  key={name}
                  width="full"
                  fontWeight="400"
                  display="flex"
                  gap="0.5rem"
                  justifyContent="start"
                  variant={isPath ? 'solid' : 'ghost'}
                  colorScheme={isPath ? 'red' : ''}
                  onClick={() => handleNavClick(path)}
                >
                  <Icon name={iconName} fontWeight="200" {...color} />
                  <Text fontSize="sm" {...color}>{name}</Text>
                </Button>
              )
            })}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Navbar
