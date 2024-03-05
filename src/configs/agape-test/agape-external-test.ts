import { Milestone } from '../../features/MentoringJourneys/CreateMentoringJourney/redux/types'
import { deepCopy } from '../../utils'
import DEFAULT_MILESTONES from './defaultMilestones.json'

export const initMilestone = (startDate: string, mentor: string): Milestone[] => {
  const milestones: Milestone[] = deepCopy(DEFAULT_MILESTONES)
  for (let i = 0; i < milestones.length; i += 1) {
    const milestone = milestones[i]
    const { goals } = milestone
    for (let e = 0; e < goals.length; e += 1) {
      const goal = goals[e]
      const { actionPlans } = goal
      goal.deadline = addMonths(startDate, (i + 1) * 2)
      for (let o = 0; o < actionPlans.length; o += 1) {
        const actionPlan = actionPlans[o]
        actionPlan.byWho = mentor
        actionPlan.deadline = addMonths(startDate, (i + 1) * 2)
      }
    }
  }

  return milestones
}

function addMonths(dateString: string, numMonths: number) {
  const date = new Date(dateString)

  date.setDate(date.getDate() + numMonths * 30)

  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Month is 0-indexed
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}
