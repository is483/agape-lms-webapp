import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { apiSlice } from '../apiSlice'
import {
  ForgetPasswordRequest, LoginRequest, LoginResponse, RegisterRequest,
  ResetPasswordRequest, VerifyResetTokenRequest, VerifyResetTokenResponse,
} from './types'
import { defaultOnQueryStarted as onQueryStarted, handleFetchError } from './utils'
import { setIsLoggedIn, setToken } from '../../redux/appSlice'

const apiAuthSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
        invalidateTags: ['User'],
      }),
      onQueryStarted: (_arg: any, { dispatch, queryFulfilled }) => {
        queryFulfilled.then(({ data }) => {
          const { token } = data
          dispatch(setToken(token))
          dispatch(setIsLoggedIn(true))
        }).catch(({ error }) => {
          console.error(error)
          const { status } = error as FetchBaseQueryError
          handleFetchError(status, dispatch)
        })
      },
    }),
    register: build.mutation<null, RegisterRequest>({
      query: (credentials) => ({
        url: 'register',
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted,
    }),
    forgetPassword: build.mutation<null, ForgetPasswordRequest>({
      query: (payload) => ({
        url: 'forget-password',
        method: 'POST',
        body: payload,
      }),
      onQueryStarted,
    }),
    resetPassword: build.mutation<null, ResetPasswordRequest>({
      query: (payload) => ({
        url: 'reset-password',
        method: 'POST',
        body: payload,
      }),
      onQueryStarted,
    }),
    verifyResetToken: build.mutation<VerifyResetTokenResponse, VerifyResetTokenRequest>({
      query: (payload) => ({
        url: 'verify-reset-token',
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
