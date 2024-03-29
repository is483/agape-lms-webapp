import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Role } from '../types'

export interface AppState {
  auth: {
    token: string | null
    isLoggedIn: boolean
    role: Role | null
  }
  onboardingStatus: {
    isComplete: boolean
  }
}

const initialState: AppState = {
  auth: {
    token: null,
    isLoggedIn: false,
    role: null,
  },
  onboardingStatus: {
    isComplete: false,
  },
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setToken: (state: AppState, action: PayloadAction<string | null>) => {
      state.auth.token = action.payload
    },
    setIsLoggedIn: (state: AppState, action: PayloadAction<boolean>) => {
      state.auth.isLoggedIn = action.payload
    },
    setRole: (state: AppState, action: PayloadAction<Role>) => {
      state.auth.role = action.payload
    },
    setAuth: (
      state: AppState,
      action: PayloadAction<{ token: string | null, isLoggedIn: boolean, role: Role | null }>,
    ) => {
      state.auth = action.payload
    },
    setOnboardingStatus: (
      state: AppState,
      action: PayloadAction<{
        isComplete: boolean
      }>) => {
      state.onboardingStatus = action.payload
    },
  },
})

export const {
  setToken, setIsLoggedIn, setRole, setAuth,
  setOnboardingStatus,
} = appSlice.actions
export default appSlice.reducer
