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
import { MentoringJourneyDetails } from '../features/MentoringJourneys/MentoringJourneyDetails'
import { AssignedMentees } from '../features/AssignedMentees'
import MenteeMilestones from '../features/MentoringJourneys/MentoringJourneyDetails/Milestones/MenteeMilestones'
import { Sessions } from '../features/Sessions'
import { SessionDetails } from '../features/Sessions/SessionDetails'
import { MentorQuarterlyFeedback } from '../features/Feedback'
import MenteeFeedback from '../features/Feedback/MenteeFeedback'
import { AssignedMentors } from '../features/AssignedMentors'

function AppLayout() {
  const { role } = useAppSelector(getAuth)

  return (
    <Box background="gray.50" minHeight="100vh">
      <Flex gap="0">
        <Box width={[0, null, null, 280]} minHeight="100vh">
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
              <Route path={paths.MentoringJourneys.Details.fullPath} element={<MentoringJourneyDetails />} />
              <Route path={paths.MentoringJourneys.Create} element={<CreateMentoringJourney />} />
              <Route path={paths.Sessions.ViewAll} element={<Sessions />} />
              <Route path={paths.Sessions.Details.fullPath} element={<SessionDetails />} />
              <Route path={paths.AssignedMentees} element={<AssignedMentees />} />
              <Route path={`${paths.AssignedMentees}/:userId`} element={<AssignedMentees />} />
              <Route path={paths.QuarterlyFeedback.fullPath} element={<MentorQuarterlyFeedback />} />
            </Routes>
          )}
          {role === 'Mentee' && (
            <Routes>
              <Route path={paths.Introduction} element={<Introduction />} />
              <Route path={paths.MyProfile} element={<MyProfile />} />
              <Route path={paths.MentoringJourneys.ViewAll} element={<MentoringJourneys />} />
              <Route path={paths.Milestones} element={<MenteeMilestones />} />
              <Route path={paths.Sessions.ViewAll} element={<Sessions />} />
              <Route path={paths.Sessions.Details.fullPath} element={<SessionDetails />} />
              <Route path={paths.Feedback} element={<MenteeFeedback />} />
              <Route path={paths.MentorProfile} element={<AssignedMentors />} />
            </Routes>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default AppLayout
