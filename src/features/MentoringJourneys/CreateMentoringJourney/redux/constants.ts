import { Milestone } from './types'

export const defaultMilestones: Milestone[] = [1, 2, 3, 4, 5, 6].map((step) => ({
  title: '',
  step,
  reflection: '',
  goals: [],
}))
