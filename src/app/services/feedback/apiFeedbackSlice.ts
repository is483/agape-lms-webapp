import { apiSlice } from '../apiSlice'
import { defaultOnQueryStarted as onQueryStarted } from '../utils'
import { MentorQuarterlyFeedbackResponse, MentorSessionFeedbackResponse } from './type'

const apiFeedbackSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getMentorSessionFeedback: build.query<MentorSessionFeedbackResponse, string | number>({
      query: (mentoringJourneyId) => ({
        url: `session/mentor/mentoring-journey/${mentoringJourneyId}`,
        method: 'GET',
      }),
      onQueryStarted,
    }),
    getMentorQuarterlyFeedback: build.query<MentorQuarterlyFeedbackResponse, string | number>({
      query: (mentoringJourneyId) => ({
        url: `mentor/mentoring-journey/feedbacks/quarterly/${mentoringJourneyId}`,
        method: 'GET',
      }),
      onQueryStarted,
    }),
    getMenteeSessionFeedback: build.query<MentorSessionFeedbackResponse, null>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      onQueryStarted,
    }),
    getMenteeQuarterlyFeedback: build.query<MentorSessionFeedbackResponse, null>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      onQueryStarted,
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetMentorSessionFeedbackQuery,
  useGetMentorQuarterlyFeedbackQuery,
} = apiFeedbackSlice
