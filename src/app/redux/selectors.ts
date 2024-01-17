import { RootState } from '../store'

export const getAuth = (state: RootState) => state.app.auth

export const getOnboardingStatus = (state: RootState) => state.app.onboardingStatus
