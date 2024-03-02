import { apiSlice } from '../apiSlice'
import { defaultOnQueryStarted as onQueryStarted } from '../utils'
import {
  AnswerFeedbackRequest,
  FeedbackResponse,
  MenteeQuarterlyFeedbackResponse, MenteeSessionFeedbackResponse,
  MentorQuarterlyFeedbackResponse, MentorSessionFeedbackResponse,
} from './type'

const apiFeedbackSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllMentorSessionFeedback: build.query<MentorSessionFeedbackResponse, string | number>({
      query: (mentoringJourneyId) => ({
        url: `session/mentor/mentoring-journey/${mentoringJourneyId}`,
        method: 'GET',
      }),
      onQueryStarted,
    }),
    getAllMentorQuarterlyFeedback: build.query<MentorQuarterlyFeedbackResponse, string | number>({
      query: (mentoringJourneyId) => ({
        url: `mentor/mentoring-journey/feedbacks/quarterly/${mentoringJourneyId}`,
        method: 'GET',
      }),
      onQueryStarted,
    }),
    getAllMenteeSessionFeedback: build.query<MenteeSessionFeedbackResponse, null>({
      query: () => ({
        url: 'session/mentee/feedback',
        method: 'GET',
      }),
      onQueryStarted,
    }),
    getAllMenteeQuarterlyFeedback: build.query<MenteeQuarterlyFeedbackResponse, null>({
      query: () => ({
        url: 'mentee/mentoring-journey/feedbacks/quarterly',
        method: 'GET',
      }),
      onQueryStarted,
    }),
    getMentorQuarterlyFeedback: build.query<FeedbackResponse, string | number>({
      query: (quarterlyFeedbackId) => ({
        url: `mentor/mentoring-journey/feedbacks/quarterly/feedback/${quarterlyFeedbackId}`,
        method: 'GET',
      }),
      onQueryStarted,
    }),
    getMenteeQuarterlyFeedback: build.query<FeedbackResponse, AnswerFeedbackRequest>({
      query: (quarterlyFeedbackId) => ({
        url: `mentee/mentoring-journey/feedbacks/quarterly/feedback/${quarterlyFeedbackId}`,
        method: 'GET',
      }),
      onQueryStarted,
    }),
    answerMentorQuarterlyFeedback: build.query<null, string | number>({
      query: (quarterlyFeedbackId) => ({
        url: `mentor/mentoring-journey/feedbacks/quarterly/feedback/${quarterlyFeedbackId}`,
        method: 'PUT',
      }),
      onQueryStarted,
    }),
    answerMenteeQuarterlyFeedback: build.query<null, AnswerFeedbackRequest>({
      query: (quarterlyFeedbackId) => ({
        url: `mentee/mentoring-journey/feedbacks/quarterly/feedback/${quarterlyFeedbackId}`,
        method: 'GET',
      }),
      onQueryStarted,
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAllMentorSessionFeedbackQuery,
  useGetAllMentorQuarterlyFeedbackQuery,
  useGetAllMenteeSessionFeedbackQuery,
  useGetAllMenteeQuarterlyFeedbackQuery,
} = apiFeedbackSlice
