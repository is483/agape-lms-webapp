import { configureStore } from '@reduxjs/toolkit'
import appReducer from './app/redux/appSlice'
import navbarReducer from './features/Navbar/redux/navbarSlice'

export default configureStore({
  reducer: {
    appReducer: appReducer,
    navbarReducer: navbarReducer,
  },
})
