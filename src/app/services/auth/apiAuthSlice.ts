import { apiSlice } from '../apiSlice'
import { LoginRequest, LoginResponse } from './types'

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
  }),
  overrideExisting: false,
})

export const { useLoginMutation } = apiAuthSlice
