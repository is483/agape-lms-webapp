// TODO: Consider using these as the type in the app. Either that or will need to do data transformation between BE and FE
export interface ActionPlan {
  byWho: string,
  deadline: string,
  resourcesRequired: string,
  progressIndicator: string,
  step: number
}

export interface Goal {
  goalName: string,
  measurableObjective: string,
  deadline: string,
  actionPlans: ActionPlan[]
}

export interface Milestone {
  milestoneTitle: string,
  milestoneStep: number,
  reflection: string,
  goal: Goal[]
}

export interface CreateMentoringJourneyRequest {
  menteeId: string,
  title: string,
  startDate: string,
  description: string,
  mentoringOutcome: string,
  outcomeDescription: string,
  milestones: Milestone[]
}
