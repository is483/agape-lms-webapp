import { apiSlice } from '../apiSlice'
import { defaultOnQueryStarted as onQueryStarted } from '../utils'
import {
  AnswerFeedbackRequest,
  QuarterlyFeedbackResponse,
  SessionFeedbackResponse,
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
    getMentorQuarterlyFeedback: build.query<QuarterlyFeedbackResponse, string | number>({
      query: (quarterlyFeedbackId) => ({
        url: `mentor/mentoring-journey/feedbacks/quarterly/feedback/${quarterlyFeedbackId}`,
        method: 'GET',
      }),
      onQueryStarted,
    }),
    getMentorSessionFeedback: build.query<SessionFeedbackResponse, string | number>({
      query: (sessionId) => ({
        url: `session/mentor/feedback/${sessionId}`,
        method: 'GET',
      }),
      onQueryStarted,
    }),
    getMenteeQuarterlyFeedback: build.query<QuarterlyFeedbackResponse, AnswerFeedbackRequest>({
      query: (quarterlyFeedbackId) => ({
        url: `mentee/mentoring-journey/feedbacks/quarterly/feedback/${quarterlyFeedbackId}`,
        method: 'GET',
      }),
      onQueryStarted,
    }),
    getMenteeSessionFeedback: build.query<SessionFeedbackResponse, string | number>({
      query: (sessionId) => ({
        url: `session/mentee/feedback/${sessionId}`,
        method: 'GET',
      }),
      onQueryStarted,
    }),
    answerMentorQuarterlyFeedback: build.mutation<null, AnswerFeedbackRequest>({
      query: (body) => ({
        url: `mentor/mentoring-journey/feedbacks/quarterly/feedback/${body.id}`,
        method: 'PUT',
        body: body.feedbackAnswers,
      }),
      onQueryStarted,
    }),
    answerMentorSessionFeedback: build.mutation<null, AnswerFeedbackRequest>({
      query: (body) => ({
        url: `session/mentor/feedback/${body.id}`,
        method: 'PUT',
        body: body.feedbackAnswers,
      }),
      onQueryStarted,
    }),
    answerMenteeQuarterlyFeedback: build.mutation<null, AnswerFeedbackRequest>({
      query: (body) => ({
        url: `mentee/mentoring-journey/feedbacks/quarterly/feedback/${body.id}`,
        method: 'PUT',
        body: body.feedbackAnswers,
      }),
      onQueryStarted,
    }),
    answerMenteeSessionFeedback: build.mutation<null, AnswerFeedbackRequest>({
      query: (body) => ({
        url: `session/mentee/feedback/${body.id}`,
        method: 'PUT',
        body: body.feedbackAnswers,
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
  useGetMenteeQuarterlyFeedbackQuery,
  useGetMentorQuarterlyFeedbackQuery,
  useGetMenteeSessionFeedbackQuery,
  useGetMentorSessionFeedbackQuery,
  useAnswerMenteeSessionFeedbackMutation,
  useAnswerMentorSessionFeedbackMutation,
  useAnswerMenteeQuarterlyFeedbackMutation,
  useAnswerMentorQuarterlyFeedbackMutation,
} = apiFeedbackSlice
