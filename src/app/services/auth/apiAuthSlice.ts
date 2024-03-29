import { apiSlice } from '../apiSlice'
import {
  ForgetPasswordRequest, LoginRequest, LoginResponse, RegisterRequest,
  ResetPasswordRequest, VerifyResetTokenRequest, VerifyResetTokenResponse,
} from './types'
import { defaultOnQueryStarted as onQueryStarted, defaultCatchHandler } from '../utils'
import { setAuth, setOnboardingStatus } from '../../redux/appSlice'
import { Role } from '../../types'
import { OnboardingResponse } from '../user/types'
import { resetTokenHeaders } from './utils'

const apiAuthSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'user/login',
        method: 'POST',
        body: credentials,
        invalidateTags: ['User'],
      }),
      transformResponse: ({ token, role }: { token: string, role: string }) => ({
        token,
        role: role.charAt(0).toUpperCase() + role.slice(1) as Role,
      }),
      onQueryStarted: (_arg: any, { dispatch, queryFulfilled }) => {
        queryFulfilled.then(({ data }) => {
          const { token, role } = data
          dispatch(setAuth({
            token,
            isLoggedIn: true,
            role,
          }))
          localStorage.setItem('token', token)
        }).catch(({ error }) => {
          defaultCatchHandler(error, dispatch)
        })
      },
    }),
    register: build.mutation<null, RegisterRequest>({
      query: (credentials) => ({
        url: 'user/register',
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted,
    }),
    forgetPassword: build.mutation<null, ForgetPasswordRequest>({
      query: (payload) => ({
        url: `user/forget-password?email=${payload.email}`,
        method: 'GET',
      }),
      onQueryStarted,
    }),
    resetPassword: build.mutation<null, ResetPasswordRequest>({
      query: (payload) => ({
        url: 'user/reset-password',
        method: 'PUT',
        body: payload,
        headers: resetTokenHeaders(payload),
      }),
      onQueryStarted,
    }),
    verifyResetToken: build.mutation<VerifyResetTokenResponse, VerifyResetTokenRequest>({
      query: (payload) => ({
        url: 'user/verify-reset-token',
        method: 'GET',
        headers: resetTokenHeaders(payload),
      }),
      onQueryStarted,
    }),
    verifyOnboardingStatus: build.mutation<OnboardingResponse, null>({
      query: () => ({
        url: 'user/verify-onboarding-status',
        method: 'GET',
      }),
      onQueryStarted: (_arg: any, { dispatch, queryFulfilled }) => {
        queryFulfilled.then(({ data }) => {
          const { onboardingComplete } = data
          dispatch(setOnboardingStatus({
            isComplete: onboardingComplete,
          }))
        }).catch(({ error }) => {
          defaultCatchHandler(error, dispatch)
        })
      },
    }),
  }),
  overrideExisting: false,
})

export const {
  useLoginMutation, useRegisterMutation, useForgetPasswordMutation, useResetPasswordMutation,
  useVerifyResetTokenMutation, useVerifyOnboardingStatusMutation,
} = apiAuthSlice
