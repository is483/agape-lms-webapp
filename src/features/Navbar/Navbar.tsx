import {
  Box, Button, Image, Text,
} from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { memo, useCallback } from 'react'
import { Role } from '../../app/types'
import { NavbarLinkSection, NavbarLinks, navbarLinksRecord } from './constants'
import { Icon } from '../../components'
import useBreakpoint from '../../hooks/useBreakpoint'
import agapeLogo from '../../assets/agape_logo.png'
import { useAppDispatch } from '../../hooks'
import { setAuth } from '../../app/redux/appSlice'
import paths from '../../paths'

interface Props {
  role: Role
}

function Navbar(props: Props) {
  const { role } = props
  const navbarLinks = navbarLinksRecord[role!]
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { pathname } = location
  const isMdUp = useBreakpoint('md')

  const handleNavClick = useCallback((path: string) => {
    navigate(path)
  }, [navigate])

  const handleLogout = () => {
    dispatch(setAuth({
      token: null,
      isLoggedIn: false,
      role: null,
    }))
    localStorage.removeItem('token')
    navigate(paths.Login)
  }

  const NavbarComponent = isMdUp ? DesktopSideNavbar : MobileNavbar

  return (
    <NavbarComponent
      navbarLinks={navbarLinks}
      handleNavClick={handleNavClick}
      pathname={pathname}
      role={role}
      handleLogout={handleLogout}
    />
  )
}

interface NavbarProps {
  navbarLinks: NavbarLinkSection[]
  handleNavClick: (path: string) => void
  pathname: string
  role: Role
  handleLogout: () => void
}

const DesktopSideNavbar = memo(({
  navbarLinks, handleNavClick, pathname, role,
  handleLogout,
}: NavbarProps) => (
  <Box
    background="white"
    width="280px"
    height="100%"
    position="fixed"
    display="flex"
    alignItems="center"
    flexDirection="column"
    gap="5"
    padding="8"
  >
    {/* TODO: Get user image + full name */}
    {role === 'Admin'
      ? <Image src={agapeLogo} maxWidth="100%" />
      : (
        <>
          <Image src="https://i.pravatar.cc/" borderRadius="100%" maxWidth="100%" width="140px" height="140px" />
          <Text fontSize="xl" fontWeight="700" wordBreak="break-all" color="red.700">
            Name Placeholder
          </Text>
        </>
      )}
    <Box display="flex" gap="6" flexDirection="column" width="100%">
      {navbarLinks.map(({ title, links }) => (
        <Box key={title} display="flex" gap="2" flexDirection="column">
          <Text fontWeight="bold" marginLeft="5" fontSize="xs" textTransform="uppercase">{title}</Text>
          {links.map(({ name, iconName, path }) => {
            const isPath = path === pathname.toLowerCase()
            const color = {
              color: isPath ? 'white' : 'secondary.500',
            }
            return (
              <Button
                key={name}
                width="full"
                fontWeight="400"
                display="flex"
                gap="2"
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
      <Button fontSize="xs" fontWeight="bold" size="sm" onClick={handleLogout} textTransform="uppercase" leftIcon={<Icon fontSize="20px" name="logout" />}>
        Logout
      </Button>
    </Box>
  </Box>
))

const MobileNavbar = memo(({ navbarLinks, handleNavClick, pathname }: NavbarProps) => {
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
})

export default Navbar
