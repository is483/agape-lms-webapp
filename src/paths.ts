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
    // Lance: To change again
    Details: '/sessions/details',
  },
  AssignedMentees: '/assigned-mentees',
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
