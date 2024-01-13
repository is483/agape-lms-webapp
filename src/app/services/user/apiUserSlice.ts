import { apiSlice } from '../apiSlice'
import { ExperienceRequest, InfoRequest, MenteeExperienceRequest } from './types'
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
    updateMentorExperience: build.mutation<null, ExperienceRequest>({
      query: (request) => ({
        url: 'mentor/onboarding/experience',
        method: 'PUT',
        body: request,
      }),
      onQueryStarted,
    }),
    updateMenteeExperience: build.mutation<null, MenteeExperienceRequest>({
      query: (request) => ({
        url: 'mentee/onboarding/experience',
        method: 'PUT',
        body: request,
      }),
      onQueryStarted,
    }),
  }),
  overrideExisting: false,
})

export const {
  useUpdateMenteeInfoMutation, useUpdateMentorInfoMutation,
  useUpdateMentorExperienceMutation, useUpdateMenteeExperienceMutation,
} = apiUserSlice
