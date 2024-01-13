import { apiSlice } from '../apiSlice'
import { InfoRequest } from './types'
import { defaultOnQueryStarted as onQueryStarted } from '../utils'

const apiUserSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    updateMentorInfo: build.mutation<null, InfoRequest>({
      query: (request) => ({
        url: 'mentor/onboarding/information',
        method: 'PUT',
        body: request,
      }),
      onQueryStarted,
    }),
    updateMenteeInfo: build.mutation<null, InfoRequest>({
      query: (request) => ({
        url: 'mentee/onboarding/information',
        method: 'PUT',
        body: request,
      }),
      onQueryStarted,
    }),
  }),
  overrideExisting: false,
})

export const {
  useUpdateMenteeInfoMutation, useUpdateMentorInfoMutation
} = apiUserSlice
