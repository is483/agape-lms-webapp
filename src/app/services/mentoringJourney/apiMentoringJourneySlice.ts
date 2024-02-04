import { apiSlice } from '../apiSlice'
import {
  CreateMentoringJourneyRequest, MentoringJourneyDetailsResponse, MentoringJourneysResponse,
  UpdateMentoringJourneyRequest,
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
  }),
  overrideExisting: false,
})

export const {
  useCreateMentoringJourneyMutation, useGetAllMentoringJourneyQuery,
  useGetMentoringJourneyOverviewQuery, useUpdateMentoringJourneyOverviewMutation,
} = apiMentoringJourneySlice
