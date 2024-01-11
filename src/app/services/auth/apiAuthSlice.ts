import { apiSlice } from '../apiSlice'
import {
  ForgetPasswordRequest, LoginRequest, LoginResponse, RegisterRequest,
  RegisterResponse, ResetPasswordRequest, VerifyResetTokenRequest, VerifyResetTokenResponse,
} from './types'
import { defaultOnQueryStarted as onQueryStarted } from './utils'

const apiAuthSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
        invalidateTags: ['User'],
      }),
      onQueryStarted,
    }),
    register: build.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: 'register',
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted,
    }),
    forgetPassword: build.mutation<any, ForgetPasswordRequest>({
      query: (payload) => ({
        url: 'forget-password',
        method: 'POST',
        body: payload,
      }),
      onQueryStarted,
    }),
    resetPassword: build.mutation<any, ResetPasswordRequest>({
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
