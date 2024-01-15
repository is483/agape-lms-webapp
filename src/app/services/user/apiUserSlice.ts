import { apiSlice } from '../apiSlice'
import {
  ChallengesRequest, ExperienceRequest, InfoRequest, InterestsRequest,
  MenteeExperienceRequest, MenteeMentoringRequest,
  MentorMentoringRequest, SkillsRequest, TransformedUserResponse,
  UserRequest, UserResponse, ValuesRequest,
} from './types'
import { defaultOnQueryStarted as onQueryStarted } from '../utils'
import { formatDate } from '../../../utils'
import { transformGender } from './utils'

const apiUserSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUserInfo: build.query<TransformedUserResponse, UserRequest>({
      query: ({ role }) => ({
        url: `/user/retrieve-profile?role=${role}`,
      }),
      providesTags: ['User'],
      transformResponse: (response: { profile: UserResponse }): TransformedUserResponse => {
        const transformedResponse: any = { ...response?.profile }
        transformedResponse.gender = transformGender(response.profile.gender) ?? ''
        transformedResponse.dateOfBirth = formatDate(response.profile.dateOfBirth) ?? ''
        transformedResponse.workExperience = JSON.parse(response.profile?.workExperience) ?? []
        transformedResponse.skills = response.profile.skills?.split(', ') ?? []
        transformedResponse.personalValues = response.profile.personalValues?.split(', ') ?? ['']
        transformedResponse.preferredMeetingDays = response.profile.preferredMeetingDays?.split(', ').filter((day) => day !== '') ?? []
        transformedResponse.preferredMentoringApproach = response.profile.preferredMentoringApproach?.split(', ') ?? ['']
        transformedResponse.challenges = response.profile.challenges?.split(', ') ?? ['']
        transformedResponse.interests = response.profile.interests?.split(', ') ?? ['']
        transformedResponse.expectations = response.profile.expectations ?? ''
        transformedResponse.firstName = response.profile.firstName ?? ''
        transformedResponse.lastName = response.profile.lastName ?? ''
        transformedResponse.phoneNumber = response.profile.phoneNumber ?? ''
        return transformedResponse
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
