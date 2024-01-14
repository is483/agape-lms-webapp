import { apiSlice } from '../apiSlice'
import {
  ChallengesRequest, ExperienceRequest, InfoRequest, InterestsRequest,
  MenteeExperienceRequest, MenteeMentoringRequest,
  MentorMentoringRequest, RoleResponse, SkillsRequest, ValuesRequest,
} from './types'
import { defaultOnQueryStarted as onQueryStarted } from '../utils'
import { Role } from '../../types'

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
    updateMentorSkills: build.mutation<null, SkillsRequest>({
      query: (request) => ({
        url: 'mentor/onboarding/skills',
        method: 'PUT',
        body: request,
      }),
      onQueryStarted,
    }),
    updateMenteeSkills: build.mutation<null, SkillsRequest>({
      query: (request) => ({
        url: 'mentee/onboarding/skills',
        method: 'PUT',
        body: request,
      }),
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
      onQueryStarted,
    }),
    updateMentorValues: build.mutation<null, ValuesRequest>({
      query: (request) => ({
        url: 'mentor/onboarding/values',
        method: 'PUT',
        body: request,
      }),
      onQueryStarted,
    }),
    updateMenteeValues: build.mutation<null, ValuesRequest>({
      query: (request) => ({
        url: 'mentee/onboarding/values',
        method: 'PUT',
        body: request,
      }),
      onQueryStarted,
    }),
    updateMentorChallenges: build.mutation<null, ChallengesRequest>({
      query: (request) => ({
        url: 'mentor/onboarding/challenges',
        method: 'PUT',
        body: request,
      }),
      onQueryStarted,
    }),
    updateMenteeChallenges: build.mutation<null, ChallengesRequest>({
      query: (request) => ({
        url: 'mentee/onboarding/challenges',
        method: 'PUT',
        body: request,
      }),
      onQueryStarted,
    }),
    updateMentorMentoringStyle: build.mutation<null, MentorMentoringRequest>({
      query: (request) => ({
        url: 'mentor/onboarding/style',
        method: 'PUT',
        body: request,
      }),
      onQueryStarted,
    }),
    updateMenteeMentoringStyle: build.mutation<null, MenteeMentoringRequest>({
      query: (request) => ({
        url: 'mentee/onboarding/style',
        method: 'PUT',
        body: request,
      }),
      onQueryStarted,
    }),
    getUserRole: build.query<RoleResponse, null>({
      query: () => ({
        url: 'user/retrieve-role',
      }),
      transformResponse: ({ role }: { role: string }) => ({
        role: role.charAt(0).toUpperCase() + role.slice(1) as Role,
      }),
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
  useGetUserRoleQuery,
} = apiUserSlice
