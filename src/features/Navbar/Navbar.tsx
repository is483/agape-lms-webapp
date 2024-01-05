import {
  Box, Button, Image, Text,
} from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { Role } from '../../app/types'
import { NavbarLinkSection, NavbarLinks, navbarLinksRecord } from './constants'
import { Icon } from '../../components'
import useBreakpoint from '../../hooks/useBreakpoint'

interface Props {
  role: Role
}

function Navbar(props: Props) {
  const { role } = props
  const navbarLinks = navbarLinksRecord[role!]
  const location = useLocation()
  const navigate = useNavigate()
  const { pathname } = location
  const isMdUp = useBreakpoint('md')

  const handleNavClick = useCallback((path: string) => {
    navigate(path)
  }, [navigate])

  const NavbarComponent = isMdUp ? DesktopSideNavbar : MobileNavbar

  return (
    <NavbarComponent
      navbarLinks={navbarLinks}
      handleNavClick={handleNavClick}
      pathname={pathname}
    />
  )
}

interface NavbarProps {
  navbarLinks: NavbarLinkSection[]
  handleNavClick: (path: string) => void
  pathname: string
}

function DesktopSideNavbar({ navbarLinks, handleNavClick, pathname }: NavbarProps) {
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

function MobileNavbar({ navbarLinks, handleNavClick, pathname }: NavbarProps) {
  const flattenLinks: NavbarLinks[] = ([] as NavbarLinks[]).concat(
    ...navbarLinks.map(({ links }) => links),
  )

  return (
    <Box
      position="fixed"
      bottom="0"
      boxShadow="lg"
      display="flex"
      width="100%"
      height="48px"
      background="white"
      justifyContent="space-between"
      alignItems="center"
    >
      {flattenLinks.map(({
        name, mobileName, iconName, path,
      }) => {
        const isPath = path === pathname.toLowerCase()
        const color = {
          ...(isPath && { color: 'red.600' }),
        }
        return (
          <Button
            key={name}
            width="full"
            fontWeight="400"
            display="flex"
            justifyContent="center"
            alignItems="center"
            variant="ghost"
            onClick={() => handleNavClick(path)}
            flexDirection="column"
            flex="1"
            color="secondary.500"
            _hover={{ background: 'none' }}
          >
            <Icon name={iconName} fontWeight="200" {...color} />
            <Text fontSize="xs" wordBreak="break-word" {...color}>{mobileName ?? name}</Text>
          </Button>
        )
      })}
    </Box>
  )
}

export default Navbar
