const paths = {
  Login: '/login',
  Register: '/register',
  ForgetPassword: '/forget-password',
  ResetPassword: '/reset-password',
  SessionExpired: '/session-expired',
  Introduction: '/onboarding/introduction',
  Onboarding: '/onboarding',

  Feedback: {
    ViewAll: '/feedback',
    QuarterlyFeedbackQuestionnaire: { fullPath: '/feedback/quarterly/:quarterFeedbackId', subPath: '/feedback/quarterly' },
    SessionFeedbackQuestionnaire: { fullPath: '/feedback/session/:sessionFeedbackId', subPath: '/feedback/session' },
  },

  MentorProfile: '/mentor-profile',
  Milestones: '/milestones',

  Sessions: {
    ViewAll: '/sessions',
    Details: { fullPath: '/sessions/:sessionId', subPath: '/sessions' },
  },
  AssignedMentees: { subPath: '/assigned-mentees', fullPath: '/assigned-mentees/:userId' },
  Training: '/training',
  MyProfile: '/profile',

  Mentors: '/mentors',
  Mentees: '/mentees',
  Pairing: '/pairing',

  MentoringJourneys: {
    ViewAll: '/mentoring-journeys',
    Details: { fullPath: '/mentoring-journeys/:mentoringJourneyId', subPath: '/mentoring-journeys' },
    Create: '/mentoring-journeys/create',
  },
}

export default paths
