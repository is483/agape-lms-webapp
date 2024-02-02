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
