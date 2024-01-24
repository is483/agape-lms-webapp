import { PayloadAction, createSlice } from '@reduxjs/toolkit'

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
}

export const mentoringJourneyFormSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
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
  },
})

export const {
  setMentee, setTitle, setDate, setDescription,
  setMenteeError, setTitleError, setDateError,
  clearBasicDetailsErrors,
} = mentoringJourneyFormSlice.actions
export default mentoringJourneyFormSlice.reducer
