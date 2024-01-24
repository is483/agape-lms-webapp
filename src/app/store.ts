import { configureStore } from '@reduxjs/toolkit'
import appReducer from './redux/appSlice'
import { apiSlice } from './services/apiSlice'
import mentoringJourneyFormReducer from '../features/MentoringJourneys/CreateMentoringJourney/redux/mentoringJourneyFormSlice'

const store = configureStore({
  reducer: {
    app: appReducer,
    mentoringJourneyForm: mentoringJourneyFormReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
