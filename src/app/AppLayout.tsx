import { Box, Flex } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from '../features/Navbar'
import { useAppSelector } from '../hooks'
import { getAuth } from './redux/selectors'
import Introduction from '../features/Onboarding/component/Introduction/Introduction'
import paths from '../paths'

function AppLayout() {
  const { role } = useAppSelector(getAuth)

  return (
    <Box background="gray.50" minHeight="100vh">
      <Flex gap="0">
        <Box width={[0, null, 280]} height="100vh">
          {role && <Navbar role={role} />}
        </Box>
        <Box width="100%" marginBottom={['48px', null, 0]}>
          {role === 'Admin' && (
            <>
            </>
          )}
          {role === 'Mentor' && (
            <Routes>
              <Route path={paths.Introduction} element={<Introduction />} />
            </Routes>
          )}
          {role === 'Mentee' && (
            <Routes>
              <Route path={paths.Introduction} element={<Introduction />} />
            </Routes>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default AppLayout
