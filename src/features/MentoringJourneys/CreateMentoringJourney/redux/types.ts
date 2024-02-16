export interface ActionPlan {
  byWho: string
  deadline: string
  resourcesRequired: string
  progressIndicator: string
  step: number
  isDone?: boolean
  actionPlanStepId?: number | string
}

export interface Goal {
  goalName: string,
  measurableObjective: string,
  deadline: string,
  actionPlans: ActionPlan[]
}

export interface Milestone {
  milestoneTitle: string
  milestoneStep: number
  reflection: string
  goals: Goal[]
  startDate?: string
  endDate?: string
  status?: string
}
