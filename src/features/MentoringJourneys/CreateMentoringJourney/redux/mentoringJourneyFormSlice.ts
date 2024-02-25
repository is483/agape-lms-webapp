import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Goal, Milestone } from './types'
import { createDefaultMilestones } from './constants'

export interface MentoringJourneyFormState {
  basicDetails: {
    menteeId: {
      value: string,
      error: string,
    },
    menteeName: {
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
    error: string
    milestoneIndex: number
    goalIndex: number | undefined
    minDeadlineDate: string
    maxDeadlineDate: string
  },
}

const createDefaultState = (): MentoringJourneyFormState => ({
  basicDetails: {
    menteeId: {
      value: '',
      error: '',
    },
    menteeName: {
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
    milestones: createDefaultMilestones(),
    error: '',
    milestoneIndex: 0,
    goalIndex: undefined,
    minDeadlineDate: '',
    maxDeadlineDate: '',
  },
})

const initialState: MentoringJourneyFormState = createDefaultState()

export const mentoringJourneyFormSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Basic Details
    setMentee: (state: MentoringJourneyFormState, action: PayloadAction<{ menteeId: string, menteeName: string }>) => {
      state.basicDetails.menteeId.value = action.payload.menteeId
      state.basicDetails.menteeName.value = action.payload.menteeName
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
      state.basicDetails.menteeId.error = ''
      state.basicDetails.title.error = ''
      state.basicDetails.date.error = ''
    },
    setMenteeError: (state: MentoringJourneyFormState, action: PayloadAction<string>) => {
      state.basicDetails.menteeId.error = action.payload
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
    addGoal: (state: MentoringJourneyFormState, action: PayloadAction<{ goal: Goal }>) => {
      const { goal } = action.payload
      const { milestoneIndex } = state.milestones
      state.milestones.milestones[milestoneIndex].goals.push(goal)
    },
    deleteGoal: (state: MentoringJourneyFormState, action: PayloadAction<{ milestoneIndex: number, goalIndex: number }>) => {
      const { milestoneIndex, goalIndex } = action.payload
      state.milestones.milestones[milestoneIndex].goals.splice(goalIndex, 1)
    },
    editGoal: (state: MentoringJourneyFormState, action: PayloadAction<{ goal: Goal }>) => {
      const { goal } = action.payload
      const { milestoneIndex, goalIndex } = state.milestones
      state.milestones.milestones[milestoneIndex].goals.splice(goalIndex!, 1, goal)
    },
    setMilestoneIndex: (state: MentoringJourneyFormState, action: PayloadAction<number>) => {
      state.milestones.milestoneIndex = action.payload
    },
    setGoalIndex: (state: MentoringJourneyFormState, action: PayloadAction<number | undefined>) => {
      state.milestones.goalIndex = action.payload
    },
    setMilestoneError: (state: MentoringJourneyFormState, action: PayloadAction<string>) => {
      state.milestones.error = action.payload
    },
    clearMentoringJourneyForm: (state: MentoringJourneyFormState) => {
      const defaultState = createDefaultState()
      state.basicDetails = defaultState.basicDetails
      state.objectives = defaultState.objectives
      state.milestones = defaultState.milestones
    },
    setMinDeadlineDate: (state: MentoringJourneyFormState, action: PayloadAction<string>) => {
      state.milestones.minDeadlineDate = action.payload
    },
    setMaxDeadlineDate: (state: MentoringJourneyFormState, action: PayloadAction<string>) => {
      state.milestones.maxDeadlineDate = action.payload
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
  addGoal, editGoal, deleteGoal,
  setMilestoneIndex, setGoalIndex,
  setMilestoneError, clearMentoringJourneyForm,
  setMinDeadlineDate, setMaxDeadlineDate,
} = mentoringJourneyFormSlice.actions
export default mentoringJourneyFormSlice.reducer
