export interface ActionPlan {
  byWho: string
  deadline: string
  resourcesRequired: string
  progressIndicator: string
}

export interface Goal {
  title: string,
  measurableObjective: string,
  deadline: string,
  actionPlans: ActionPlan[]
}

export interface Milestone {
  title: string
  step: number
  reflection: string
  goals: Goal[]
}
