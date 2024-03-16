import { apiSlice } from '../apiSlice'
import {
  CreateMentoringJourneyRequest, MentoringJourneyDetailsResponse, MentoringJourneysResponse,
  UpdateMentoringJourneyRequest, MilestonesResponse, MentoringJourneyMetricsResponse,
  UpdateActionPlanIsDoneRequest,
  AdminMentoringJourneysResponse,
  AllMentoringJourneyMetricsResponse,
} from './types'
import { defaultOnQueryStarted as onQueryStarted } from '../utils'

const apiMentoringJourneySlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createMentoringJourney: build.mutation<null, CreateMentoringJourneyRequest>({
      query: (request) => ({
        url: 'mentor/mentoring-journey/create',
        method: 'POST',
        body: request,
      }),
      invalidatesTags: ['MentoringJourney'],
      onQueryStarted,
    }),
    updateActionPlanIsDone: build.mutation<null, UpdateActionPlanIsDoneRequest>({
      query: (request) => ({
        url: `mentor/mentoring-journey/milestones/actionPlanSteps/${request.actionPlanStepId}`,
        method: 'PUT',
        body: request.body,
      }),
      onQueryStarted,
      invalidatesTags: ['Milestone'],
    }),
    getAllMentoringJourney: build.query<MentoringJourneysResponse, null>({
      query: () => ({
        url: 'mentor/mentoring-journey/view-mentoring-journeys',
        method: 'GET',
      }),
      providesTags: ['MentoringJourney'],
      onQueryStarted,
    }),
    getMentoringJourneyOverview: build.query<MentoringJourneyDetailsResponse, string | number>({
      query: (mentoringJourneyId) => ({
        url: `mentor/mentoring-journey/details/${mentoringJourneyId}`,
        method: 'GET',
      }),
      providesTags: (result) => (result
        ? [{ type: 'MentoringJourney', id: result.mentoringJourneyId }]
        : ['MentoringJourney']),
      onQueryStarted,
    }),
    updateMentoringJourneyOverview: build.mutation<null, UpdateMentoringJourneyRequest>({
      query: (request) => ({
        url: 'mentor/mentoring-journey/details',
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: (_result, _error, request) => [{ type: 'MentoringJourney', id: request.mentoringJourneyId }],
      onQueryStarted,
    }),
    // Mentor
    getMilestones: build.query<MilestonesResponse, string | number>({
      query: (mentoringJourneyId) => ({
        url: `mentor/mentoring-journey/milestones/${mentoringJourneyId}`,
        method: 'GET',
      }),
      providesTags: ['Milestone'],
      onQueryStarted,
    }),
    // Mentee
    getMilestone: build.query<MilestonesResponse, null>({
      query: () => ({
        url: 'mentee/mentoring-journey/milestones',
        method: 'GET',
      }),
      providesTags: ['Milestone'],
      onQueryStarted,
    }),
    getMentoringJourneyMetrics: build.query<MentoringJourneyMetricsResponse, null>({
      query: () => ({
        url: 'mentor/mentoring-journey/overview',
        method: 'GET',
      }),
      onQueryStarted,
    }),
    // Admin
    getAllMentoringJourneyAdmin: build.query<AdminMentoringJourneysResponse, null>({
      query: () => ({
        url: 'admin/view-mentoring-journeys',
        method: 'GET',
      }),
      onQueryStarted,
    }),
    getAllMentoringJourneyByIdAdmin: build.query<AdminMentoringJourneysResponse, string | number>({
      query: (mentorId) => ({
        url: `admin/view-mentoring-journeys/${mentorId}`,
        method: 'GET',
      }),
      onQueryStarted,
    }),
    getAllMentoringJourneyMetrics: build.query<AllMentoringJourneyMetricsResponse, string | number>({
      query: (status) => ({
        url: `admin/view-mentoring-journeys/metrics/${status}`,
        method: 'GET',
      }),
      onQueryStarted,
    }),
    deleteMentoringJourney: build.mutation<null, string | number>({
      query: (mentoringJourneyId) => ({
        url: `admin/delete-mentoring-journey/${mentoringJourneyId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MentoringJourney'],
      onQueryStarted,
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateMentoringJourneyMutation, useGetAllMentoringJourneyQuery,
  useGetMentoringJourneyOverviewQuery, useUpdateMentoringJourneyOverviewMutation,
  useGetMilestonesQuery, useGetMilestoneQuery, useGetMentoringJourneyMetricsQuery,
  useUpdateActionPlanIsDoneMutation, useGetAllMentoringJourneyAdminQuery,
  useGetAllMentoringJourneyByIdAdminQuery, useDeleteMentoringJourneyMutation,
  useGetAllMentoringJourneyMetricsQuery,
} = apiMentoringJourneySlice
