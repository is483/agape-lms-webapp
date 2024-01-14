import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { apiSlice } from '../apiSlice'
import {
  ForgetPasswordRequest, LoginRequest, LoginResponse, RegisterRequest,
  ResetPasswordRequest, VerifyResetTokenRequest, VerifyResetTokenResponse,
} from './types'
import { defaultOnQueryStarted as onQueryStarted, handleFetchError } from '../utils'
import { setIsLoggedIn, setRole, setToken } from '../../redux/appSlice'
import { Role } from '../../types'
import { router } from '../../../main'
import paths from '../../../paths'

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
          dispatch(setToken(token))
          dispatch(setIsLoggedIn(true))
          dispatch(setRole(role))
          localStorage.setItem('token', token)
          // TODO: Add decision to route to main page/onboarding page
          router.navigate(paths.Onboarding)
        }).catch(({ error }) => {
          console.error(error)
          const { status } = error as FetchBaseQueryError
          handleFetchError(status, dispatch)
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
        url: 'user/forget-password',
        method: 'POST',
        body: payload,
      }),
      onQueryStarted,
    }),
    resetPassword: build.mutation<null, ResetPasswordRequest>({
      query: (payload) => ({
        url: 'user/reset-password',
        method: 'POST',
        body: payload,
      }),
      onQueryStarted,
    }),
    verifyResetToken: build.mutation<VerifyResetTokenResponse, VerifyResetTokenRequest>({
      query: (payload) => ({
        url: 'user/verify-reset-token',
        method: 'POST',
        body: payload,
      }),
      onQueryStarted,
    }),
  }),
  overrideExisting: false,
})

export const {
  useLoginMutation, useRegisterMutation, useForgetPasswordMutation, useResetPasswordMutation,
  useVerifyResetTokenMutation,
} = apiAuthSlice
