import { Box } from '@chakra-ui/react'
import { Navbar } from '../features/Navbar'
import { useAppSelector } from '../hooks'
import getAuth from './redux/selectors'

function AppLayout() {
  const { role } = useAppSelector(getAuth)
  return (
    <Box background="gray.50" minHeight="100vh">
      {role && <Navbar role={role} />}
      {role === 'Admin' && (
        <>
        </>
      )}
      {role === 'Mentor' && (
        <>
        </>
      )}
      {role === 'Mentee' && (
        <>
        </>
      )}
    </Box>
  )
}

export default AppLayout
