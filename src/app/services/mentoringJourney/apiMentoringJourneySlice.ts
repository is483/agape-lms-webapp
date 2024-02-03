import { apiSlice } from '../apiSlice'
import { CreateMentoringJourneyRequest, MentoringJourneysResponse } from './types'
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
  }),
  overrideExisting: false,
})

export const { useCreateMentoringJourneyMutation, useGetAllMentoringJourneyQuery } = apiMentoringJourneySlice
