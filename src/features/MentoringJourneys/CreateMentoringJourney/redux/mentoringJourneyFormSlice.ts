import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Milestone } from './types'
import { defaultMilestones } from './constants'

export interface MentoringJourneyFormState {
  basicDetails: {
    mentee: {
      value: string,
      error: string,
    },
    title: {
      value: string,
      error: string,
    },
    date: {
      value: string,
      error: string,
    },
    description: {
      value: string,
    },
  },
  objectives: {
    outcome: {
      value: string,
      error: string,
    },
    description: {
      value: string,
      error: string,
    },
  },
  milestones: {
    milestones: Milestone[]
  },
}

const initialState: MentoringJourneyFormState = {
  basicDetails: {
    mentee: {
      value: '',
      error: '',
    },
    title: {
      value: '',
      error: '',
    },
    date: {
      value: '',
      error: '',
    },
    description: {
      value: '',
    },
  },
  objectives: {
    outcome: {
      value: '',
      error: '',
    },
    description: {
      value: '',
      error: '',
    },
  },
  milestones: {
    milestones: defaultMilestones,
  },
}

export const mentoringJourneyFormSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Basic Details
    setMentee: (state: MentoringJourneyFormState, action: PayloadAction<string>) => {
      state.basicDetails.mentee.value = action.payload
    },
    setTitle: (state: MentoringJourneyFormState, action: PayloadAction<string>) => {
      state.basicDetails.title.value = action.payload
    },
    setDate: (state: MentoringJourneyFormState, action: PayloadAction<string>) => {
      state.basicDetails.date.value = action.payload
    },
    setDescription: (state: MentoringJourneyFormState, action: PayloadAction<string>) => {
      state.basicDetails.description.value = action.payload
    },
    clearBasicDetailsErrors: (state: MentoringJourneyFormState) => {
      state.basicDetails.mentee.error = ''
      state.basicDetails.title.error = ''
      state.basicDetails.date.error = ''
    },
    setMenteeError: (state: MentoringJourneyFormState, action: PayloadAction<string>) => {
      state.basicDetails.mentee.error = action.payload
    },
    setTitleError: (state: MentoringJourneyFormState, action: PayloadAction<string>) => {
      state.basicDetails.title.error = action.payload
    },
    setDateError: (state: MentoringJourneyFormState, action: PayloadAction<string>) => {
      state.basicDetails.date.error = action.payload
    },
    // Objectives
    setMentoringOutcome: (state: MentoringJourneyFormState, action: PayloadAction<string>) => {
      state.objectives.outcome.value = action.payload
    },
    setOutcomeDescription: (state: MentoringJourneyFormState, action: PayloadAction<string>) => {
      state.objectives.description.value = action.payload
    },
    clearObjectiveErrors: (state: MentoringJourneyFormState) => {
      state.objectives.description.error = ''
      state.objectives.outcome.error = ''
    },
    setMentoringOutcomeError: (state: MentoringJourneyFormState, action: PayloadAction<string>) => {
      state.objectives.outcome.error = action.payload
    },
    setOutcomeDescriptionError: (state: MentoringJourneyFormState, action: PayloadAction<string>) => {
      state.objectives.description.error = action.payload
    },
    // Milestones
    addGoal: (state: MentoringJourneyFormState, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload
      state.milestones.milestones[index].goals.push({
        title: '',
        measurableObjective: '',
        deadline: '',
        actionPlans: [],
      })
    },
    removeGoal: (state: MentoringJourneyFormState, action: PayloadAction<{ milestoneIndex: number, goalIndex: number }>) => {
      const { milestoneIndex, goalIndex } = action.payload
      state.milestones.milestones[milestoneIndex].goals.splice(goalIndex, 1)
    },
    editGoal: (state: MentoringJourneyFormState, action: PayloadAction<{
      milestoneIndex: number,
      goalIndex: number,
      field: 'title' | 'measurableObjective' | 'deadline',
      value: string,
    }>) => {
      const {
        milestoneIndex, goalIndex, field, value,
      } = action.payload
      state.milestones.milestones[milestoneIndex].goals[goalIndex][field] = value
    },
  },
})

export const {
  setMentee, setTitle, setDate, setDescription,
  setMenteeError, setTitleError, setDateError,
  clearBasicDetailsErrors,
  setMentoringOutcome, setOutcomeDescription,
  setMentoringOutcomeError, setOutcomeDescriptionError,
  clearObjectiveErrors,
} = mentoringJourneyFormSlice.actions
export default mentoringJourneyFormSlice.reducer
