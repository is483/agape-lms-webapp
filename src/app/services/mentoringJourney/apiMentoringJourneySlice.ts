import { apiSlice } from '../apiSlice'
import { CreateMentoringJourneyRequest } from './types'
import { defaultOnQueryStarted as onQueryStarted } from '../utils'

const apiMentoringJourneySlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createMentoringJourney: build.mutation<null, CreateMentoringJourneyRequest>({
      query: (request) => ({
        url: 'mentor/mentoring-journeys/create',
        method: 'POST',
        body: request,
      }),
      invalidatesTags: ['MentoringJourney'],
      onQueryStarted,
    }),
  }),
  overrideExisting: false,
})

export const { useCreateMentoringJourneyMutation } = apiMentoringJourneySlice
