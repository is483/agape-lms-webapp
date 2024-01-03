import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  auth: {
    token: null,
    isLoggedIn: false,
  },
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
})

export default appSlice.reducer
