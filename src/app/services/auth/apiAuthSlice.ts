import { apiSlice } from '../apiSlice'
import { LoginRequest } from './types'

const apiAuthSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<any, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
        invalidateTags: [],
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useLoginMutation } = apiAuthSlice
