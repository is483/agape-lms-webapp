import { apiSlice } from '../apiSlice'
import { CreateMentoringJourneyRequest, MentoringJourneyDetailsResponse, MentoringJourneysResponse } from './types'
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
      onQueryStarted,
    }),
    getMentoringJourneyOverview: build.query<MentoringJourneyDetailsResponse, string | number>({
      query: (mentoringJourneyId) => ({
        url: `mentor/mentoring-journey/details/${mentoringJourneyId}`,
        method: 'GET',
      }),
      onQueryStarted,
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateMentoringJourneyMutation, useGetAllMentoringJourneyQuery,
  useGetMentoringJourneyOverviewQuery,
} = apiMentoringJourneySlice
