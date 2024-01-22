import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface MentoringJourneyFormState {
  basicDetails: {
    mentee: string
    title: string
    date: string
    description: string
  },
}

const initialState: MentoringJourneyFormState = {
  basicDetails: {
    mentee: '',
    title: '',
    date: '',
    description: '',
  },
}

export const mentoringJourneyFormSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setMentee: (state: MentoringJourneyFormState, action: PayloadAction<string>) => {
      state.basicDetails.mentee = action.payload
    },
    setTitle: (state: MentoringJourneyFormState, action: PayloadAction<string>) => {
      state.basicDetails.title = action.payload
    },
    setDate: (state: MentoringJourneyFormState, action: PayloadAction<string>) => {
      state.basicDetails.date = action.payload
    },
    setDescription: (state: MentoringJourneyFormState, action: PayloadAction<string>) => {
      state.basicDetails.description = action.payload
    },
  },
})

export const {
  setMentee, setTitle, setDate, setDescription,
} = mentoringJourneyFormSlice.actions
export default mentoringJourneyFormSlice.reducer
