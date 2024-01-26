import { Box, Flex } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from '../features/Navbar'
import { useAppSelector } from '../hooks'
import { getAuth } from './redux/selectors'
import Introduction from '../features/Onboarding/component/Introduction/Introduction'
import paths from '../paths'
import { MyProfile } from '../features/MyProfile'
import { MentoringJourneys } from '../features/MentoringJourneys'
import { CreateMentoringJourney } from '../features/MentoringJourneys/CreateMentoringJourney'

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
              <Route path={paths.MyProfile} element={<MyProfile />} />
              <Route path={paths.MentoringJourneys.ViewAll} element={<MentoringJourneys />} />
              <Route path={paths.MentoringJourneys.Create} element={<CreateMentoringJourney />} />
            </Routes>
          )}
          {role === 'Mentee' && (
            <Routes>
              <Route path={paths.Introduction} element={<Introduction />} />
              <Route path={paths.MyProfile} element={<MyProfile />} />
              <Route path={paths.MentoringJourneys.ViewAll} element={<MentoringJourneys />} />
            </Routes>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default AppLayout
