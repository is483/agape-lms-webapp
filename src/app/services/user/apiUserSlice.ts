import { apiSlice } from '../apiSlice'
import { MenteeInfoRequest,  MentorInfoRequest } from './types'
import { defaultOnQueryStarted as onQueryStarted } from '../utils'

const apiUserSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    updateMentorInfo: build.mutation<null, MentorInfoRequest>({
      query: (request) => ({
        url: 'mentor/onboarding/information',
        method: 'PUT',
        body: request,
      }),
      onQueryStarted,
    }),
    updateMenteeInfo: build.mutation<null, MenteeInfoRequest>({
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
