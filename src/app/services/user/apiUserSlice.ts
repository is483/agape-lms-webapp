import { apiSlice } from '../apiSlice'
import {
  ChallengesRequest, ExperienceRequest, InfoRequest, InterestsRequest,
  MenteeExperienceRequest, MenteeMentoringRequest,
  MentorMentoringRequest, SkillsRequest, UserRequest, ValuesRequest,
} from './types'
import { defaultOnQueryStarted as onQueryStarted } from '../utils'
import { formatDate } from '../../../utils'

const apiUserSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUserInfo: build.query<any, UserRequest>({
      query: ({ role }) => ({
        url: `/user/retrieve-profile?role=${role}`,
      }),
      providesTags: ['User'],
      transformResponse: (response: any) => {
        const transformResponse = response?.profile
        transformResponse.gender = transformResponse?.gender === 'M' ? 'Male' : 'Female'
        transformResponse.dateOfBirth = formatDate(transformResponse?.dateOfBirth)
        transformResponse.workExperience = JSON.parse(transformResponse?.workExperience)
        transformResponse.skills = transformResponse?.skills?.split(', ')
        transformResponse.personalValues = transformResponse?.personalValues?.split(', ')
        transformResponse.preferredMeetingDays = transformResponse?.preferredMeetingDays?.split(', ')
        transformResponse.preferredMentoringApproach = transformResponse?.preferredMentoringApproach?.split(', ')
        transformResponse.challenges = transformResponse?.challenges?.split(', ')
        transformResponse.interests = transformResponse?.interests?.split(', ')
        return transformResponse
      },
      onQueryStarted,
    }),
    updateMentorInfo: build.mutation<null, InfoRequest>({
      query: (request) => ({
        url: 'mentor/onboarding/information',
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: ['User'],
      onQueryStarted,
    }),
    updateMenteeInfo: build.mutation<null, InfoRequest>({
      query: (request) => ({
        url: 'mentee/onboarding/information',
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: ['User'],
      onQueryStarted,
    }),
    updateMentorExperience: build.mutation<null, ExperienceRequest>({
      query: (request) => ({
        url: 'mentor/onboarding/experience',
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: ['User'],
      onQueryStarted,
    }),
    updateMenteeExperience: build.mutation<null, MenteeExperienceRequest>({
      query: (request) => ({
        url: 'mentee/onboarding/experience',
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: ['User'],
      onQueryStarted,
    }),
    updateMentorSkills: build.mutation<null, SkillsRequest>({
      query: (request) => ({
        url: 'mentor/onboarding/skills',
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: ['User'],
      onQueryStarted,
    }),
    updateMenteeSkills: build.mutation<null, SkillsRequest>({
      query: (request) => ({
        url: 'mentee/onboarding/skills',
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: ['User'],
      onQueryStarted,
    }),
    updateMentorInterests: build.mutation<null, InterestsRequest>({
      query: (request) => ({
        url: 'mentor/onboarding/interests',
        method: 'PUT',
        body: request,
      }),
      onQueryStarted,
    }),
    updateMenteeInterests: build.mutation<null, InterestsRequest>({
      query: (request) => ({
        url: 'mentee/onboarding/interests',
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: ['User'],
      onQueryStarted,
    }),
    updateMentorValues: build.mutation<null, ValuesRequest>({
      query: (request) => ({
        url: 'mentor/onboarding/values',
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: ['User'],
      onQueryStarted,
    }),
    updateMenteeValues: build.mutation<null, ValuesRequest>({
      query: (request) => ({
        url: 'mentee/onboarding/values',
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: ['User'],
      onQueryStarted,
    }),
    updateMentorChallenges: build.mutation<null, ChallengesRequest>({
      query: (request) => ({
        url: 'mentor/onboarding/challenges',
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: ['User'],
      onQueryStarted,
    }),
    updateMenteeChallenges: build.mutation<null, ChallengesRequest>({
      query: (request) => ({
        url: 'mentee/onboarding/challenges',
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: ['User'],
      onQueryStarted,
    }),
    updateMentorMentoringStyle: build.mutation<null, MentorMentoringRequest>({
      query: (request) => ({
        url: 'mentor/onboarding/style',
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: ['User'],
      onQueryStarted,
    }),
    updateMenteeMentoringStyle: build.mutation<null, MenteeMentoringRequest>({
      query: (request) => ({
        url: 'mentee/onboarding/style',
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: ['User'],
      onQueryStarted,
    }),
  }),
  overrideExisting: false,
})

export const {
  useUpdateMentorInfoMutation, useUpdateMenteeInfoMutation,
  useUpdateMentorExperienceMutation, useUpdateMenteeExperienceMutation,
  useUpdateMentorSkillsMutation, useUpdateMenteeSkillsMutation,
  useUpdateMentorValuesMutation, useUpdateMenteeValuesMutation,
  useUpdateMentorMentoringStyleMutation, useUpdateMenteeMentoringStyleMutation,
  useUpdateMentorChallengesMutation, useUpdateMenteeChallengesMutation,
  useUpdateMentorInterestsMutation, useUpdateMenteeInterestsMutation,
  useGetUserInfoQuery,
} = apiUserSlice
