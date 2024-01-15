import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from '../features/Navbar'
import { useAppSelector } from '../hooks'
import getAuth from './redux/selectors'
import useBreakpoint from '../hooks/useBreakpoint'
import Introduction from '../features/Onboarding/component/Introduction/Introduction'
import paths from '../paths'
import Onboarding from '../features/Onboarding/Onboarding'

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
            <Route path={paths.Introduction} element={<Introduction />} />
            <Route path={`${paths.Onboarding}/:step`} element={<Onboarding />} />
          </Routes>
        )}
        {role === 'Mentee' && (
          <Routes>
            <Route path={paths.Introduction} element={<Introduction />} />
            <Route path={`${paths.Onboarding}/:step`} element={<Onboarding />} />
          </Routes>
        )}
      </Box>
    </Box>
  )
}

export default AppLayout
