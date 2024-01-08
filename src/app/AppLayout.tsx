import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from '../features/Navbar'
import { useAppSelector } from '../hooks'
import getAuth from './redux/selectors'
import useBreakpoint from '../hooks/useBreakpoint'
import Introduction from '../features/Onboarding/component/Introduction/Introduction'
import paths from '../paths'
import MentorOnboarding from '../features/Onboarding/MentorOnboarding'

function AppLayout() {
  const { role } = useAppSelector(getAuth)
  const isMdUp = useBreakpoint('md')
  // const location = useLocation()
  // const { pathname } = location

  return (
    <Box background="gray.50" minHeight="100vh">
      {role && <Navbar role={role} />}
      <Box paddingLeft={isMdUp ? '280px' : ''}>
        {role === 'Admin' && (
          <>
          </>
        )}
        {role === 'Mentor' && (
        <Routes>
          <Route path={paths.Onboarding.Introduction} element={<Introduction />} />
          <Route path={paths.Onboarding.Mentor} element={<MentorOnboarding />} />
        </Routes>
        )}
        {role === 'Mentee' && (
          <>
          </>
        )}
      </Box>
    </Box>
  )
}

export default AppLayout
