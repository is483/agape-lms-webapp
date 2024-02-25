import { apiSlice } from '../apiSlice'
import { defaultOnQueryStarted as onQueryStarted } from '../utils'
import {
  MenteeQuarterlyFeedbackResponse, MenteeSessionFeedbackResponse,
  MentorQuarterlyFeedbackResponse, MentorSessionFeedbackResponse,
} from './type'

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
    getMenteeSessionFeedback: build.query<MenteeSessionFeedbackResponse, null>({
      query: () => ({
        url: 'session/mentee/feedback',
        method: 'GET',
      }),
      onQueryStarted,
    }),
    getMenteeQuarterlyFeedback: build.query<MenteeQuarterlyFeedbackResponse, null>({
      query: () => ({
        url: 'mentee/mentoring-journey/feedbacks/quarterly',
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
  useGetMenteeSessionFeedbackQuery,
  useGetMenteeQuarterlyFeedbackQuery,
} = apiFeedbackSlice
