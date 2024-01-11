import { apiSlice } from '../apiSlice'
import {
  ForgetPasswordRequest,
  LoginRequest, LoginResponse, RegisterRequest, RegisterResponse,
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
  }),
  overrideExisting: false,
})

export const { useLoginMutation, useRegisterMutation, useForgetPasswordMutation } = apiAuthSlice
