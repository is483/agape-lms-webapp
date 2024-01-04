import { createSlice } from '@reduxjs/toolkit'
import { Role } from '../types'

interface AppState {
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
    role: null,
  },
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
})

export default appSlice.reducer
