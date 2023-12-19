import { configureStore } from '@reduxjs/toolkit'
import appReducer from './redux/appSlice'
import { apiSlice } from './services/apiSlice'

export default configureStore({
  reducer: {
    app: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})
