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
import {
  MentorQuarterlyFeedbackQuestionnaire, MenteeQuarterlyFeedbackQuestionnaire,
  MenteeFeedback, MentorSessionFeedbackQuestionnaire, MenteeSessionFeedbackQuestionnaire,
} from '../features/Feedback'
import { AssignedMentors } from '../features/AssignedMentors'
import { AdminMentoringJourneys } from '../features/AdminMentoringJourneys'
import { Mentees } from '../features/AllMentees'
import Mentors from '../features/AllMentors/Mentors'
import AdminMentoringJourneyDetails from '../features/AdminMentoringJourneys/AdminMentoringJourneyDetails/AdminMentoringJourneyDetails'
import QuarterlyFeedbackAnswers from '../features/Feedback/questionnaires/AdminView/QuarterlyFeedbackAnswers'
import MentorSessionFeedbackAnswers from '../features/Feedback/questionnaires/AdminView/MentorSessionFeedbackAnswers'
import MenteeSessionFeedbackAnswers from '../features/Feedback/questionnaires/AdminView/MenteeSessionFeedbackAnswers'

function AppLayout() {
  const { role } = useAppSelector(getAuth)

  return (
    <Box background="gray.50" minHeight="100vh">
      <Flex gap="0">
        <Box width={[0, null, null, 250]} position={['relative', null, null, 'fixed']}>
          {role && <Navbar role={role} />}
        </Box>
        <Box width="100%" marginBottom={['48px', null, null, 0]} ml={[0, null, null, 250]}>
          {role === 'Admin' && (
            <Routes>
              <Route path={paths.AdminMentoringJourneys.ViewAll} element={<AdminMentoringJourneys />} />
              <Route path={paths.AdminMentoringJourneys.Details.fullPath} element={<AdminMentoringJourneyDetails />} />
              <Route path={paths.Sessions.Details.fullPath} element={<SessionDetails />} />
              <Route path={paths.Mentors} element={<Mentors />} />
              <Route path={paths.Mentees} element={<Mentees />} />
              <Route path={paths.Feedback.Admin.QuarterlyFeedbackAnswers} element={<QuarterlyFeedbackAnswers />} />
              <Route path={paths.Feedback.Admin.SessionFeedbackAnswers.Mentor} element={<MentorSessionFeedbackAnswers />} />
              <Route path={paths.Feedback.Admin.SessionFeedbackAnswers.Mentee} element={<MenteeSessionFeedbackAnswers />} />
            </Routes>
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
              <Route path={paths.AssignedMentees.subPath} element={<AssignedMentees />} />
              <Route path={paths.AssignedMentees.fullPath} element={<AssignedMentees />} />
              <Route path={paths.Feedback.QuarterlyFeedbackQuestionnaire.fullPath} element={<MentorQuarterlyFeedbackQuestionnaire />} />
              <Route path={paths.Feedback.SessionFeedbackQuestionnaire.fullPath} element={<MentorSessionFeedbackQuestionnaire />} />
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
              <Route path={paths.Feedback.ViewAll} element={<MenteeFeedback />} />
              <Route path={paths.MentorProfile} element={<AssignedMentors />} />
              <Route path={paths.Feedback.QuarterlyFeedbackQuestionnaire.fullPath} element={<MenteeQuarterlyFeedbackQuestionnaire />} />
              <Route path={paths.Feedback.SessionFeedbackQuestionnaire.fullPath} element={<MenteeSessionFeedbackQuestionnaire />} />
            </Routes>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default AppLayout
