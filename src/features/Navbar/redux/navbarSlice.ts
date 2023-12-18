import { createSlice } from '@reduxjs/toolkit'
import { NavbarState } from './types'

const initialState: NavbarState = {
  
}


export const navbarSlice = createSlice({
  name: 'navbarState',
  initialState,
  reducers: {},
})

export default navbarSlice.reducer