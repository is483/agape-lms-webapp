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
