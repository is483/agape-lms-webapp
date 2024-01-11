import { apiSlice } from '../apiSlice'
import {
  ForgetPasswordRequest, LoginRequest, LoginResponse, RegisterRequest,
  RegisterResponse, ResetPasswordRequest, VerifyResetTokenRequest, VerifyResetTokenResponse,
} from './types'

const apiAuthSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
        invalidateTags: ['User'],
      }),
    }),
    register: build.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: 'register',
        method: 'POST',
        body: credentials,
      }),
    }),
    forgetPassword: build.mutation<any, ForgetPasswordRequest>({
      query: (payload) => ({
        url: 'forget-password',
        method: 'POST',
        body: payload,
      }),
    }),
    resetPassword: build.mutation<any, ResetPasswordRequest>({
      query: (payload) => ({
        url: 'reset-password',
        method: 'POST',
        body: payload,
      }),
    }),
    verifyResetToken: build.mutation<VerifyResetTokenResponse, VerifyResetTokenRequest>({
      query: (payload) => ({
        url: 'verify-reset-token',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useLoginMutation, useRegisterMutation, useForgetPasswordMutation, useResetPasswordMutation,
  useVerifyResetTokenMutation,
} = apiAuthSlice
