import { Milestone } from '../../../features/MentoringJourneys/CreateMentoringJourney/redux/types'

export interface CreateMentoringJourneyRequest {
  menteeId: string,
  title: string,
  startDate: string,
  description: string,
  mentoringOutcome: string,
  outcomeDescription: string,
  milestones: Milestone[]
}

export interface MenteeInfo {
  firstName: string
  lastName: string
  profileImgURL: string
}

export interface MentoringJourney {
  mentoringJourneyId: number
  milestoneStep: number
  title: string
  description: string
  status: string
  startDatetime: string
  outcome: string
  outcomeDescription: string
  mentee: MenteeInfo
}

export interface MentoringJourneysResponse {
  mentoringJourneysAssigned: MentoringJourney[]
}

export interface MentoringJourneyDetailsResponse {
  mentorId: number,
  mentee: {
    menteeId: number,
    firstName: string,
    lastName: string,
    profileImgUrl: string
  },
  mentoringJourneyId: number,
  title: string,
  totalSessionsCompleted: number,
  totalCompletedHours: number,
  startDate: string,
  endDate: string,
  description: string
}

export interface UpdateMentoringJourneyRequest {
  mentoringJourneyId: string
  title: string
  description: string
}

export interface MilestonesResponse {
  outcome: string
  outcomeDescription: string
  milestones: Milestone[]
}

export interface MentoringJourneyMetricsResponse {
  mentorId: number
  totalAssignedMentees: number
  totalCompletedSessions: number
  totalCompletedHours: number
}
