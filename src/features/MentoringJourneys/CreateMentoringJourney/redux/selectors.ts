import { RootState } from '../../../../app/store'

export const getBasicDetails = (state: RootState) => state.mentoringJourneyForm.basicDetails

export const getObjectives = (state: RootState) => state.mentoringJourneyForm.objectives

export const getMilestones = (state: RootState) => state.mentoringJourneyForm.milestones
