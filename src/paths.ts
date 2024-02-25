const paths = {
  Login: '/login',
  Register: '/register',
  ForgetPassword: '/forget-password',
  ResetPassword: '/reset-password',
  SessionExpired: '/session-expired',
  Introduction: '/onboarding/introduction',
  Onboarding: '/onboarding',

  Feedback: '/feedback',
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

  QuarterlyFeedback: { fullPath: '/quarterly-feedback/:quarterFeedbackId', subPath: '/quarterly-feedback' },
}

export default paths
