import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Role } from '../types'

export interface AppState {
  auth: {
    token: string | null,
    isLoggedIn: boolean,
    role: Role | null,
  }
}

const initialState: AppState = {
  auth: {
    token: null,
    isLoggedIn: false,
    role: 'Mentor',
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
  },
})

export const { setToken, setIsLoggedIn } = appSlice.actions
export default appSlice.reducer
