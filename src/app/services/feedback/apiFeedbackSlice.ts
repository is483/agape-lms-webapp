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
      providesTags: ['Feedbacks'],
    }),
    getAllMentorQuarterlyFeedback: build.query<MentorQuarterlyFeedbackResponse, string | number>({
      query: (mentoringJourneyId) => ({
        url: `mentor/mentoring-journey/feedbacks/quarterly/${mentoringJourneyId}`,
        method: 'GET',
      }),
      onQueryStarted,
      providesTags: ['Feedbacks'],
    }),
    getAllMenteeSessionFeedback: build.query<MenteeSessionFeedbackResponse, null>({
      query: () => ({
        url: 'session/mentee/feedback',
        method: 'GET',
      }),
      onQueryStarted,
      providesTags: ['Feedbacks'],
    }),
    getAllMenteeQuarterlyFeedback: build.query<MenteeQuarterlyFeedbackResponse, null>({
      query: () => ({
        url: 'mentee/mentoring-journey/feedbacks/quarterly',
        method: 'GET',
      }),
      onQueryStarted,
      providesTags: ['Feedbacks'],
    }),
    getMentorQuarterlyFeedback: build.query<QuarterlyFeedbackResponse, string | number>({
      query: (quarterlyFeedbackId) => ({
        url: `mentor/mentoring-journey/feedbacks/quarterly/feedback/${quarterlyFeedbackId}`,
        method: 'GET',
      }),
      onQueryStarted,
      providesTags: (result) => (result
        ? [{ type: 'Feedback', id: result.quarterlyFeedbackId }]
        : ['Feedback']),
    }),
    getMentorSessionFeedback: build.query<SessionFeedbackResponse, string | number>({
      query: (sessionId) => ({
        url: `session/mentor/feedback/${sessionId}`,
        method: 'GET',
      }),
      onQueryStarted,
      providesTags: (result) => (result
        ? [{ type: 'Feedback', id: result.sessionId }]
        : ['Feedback']),
    }),
    getMenteeQuarterlyFeedback: build.query<QuarterlyFeedbackResponse, AnswerFeedbackRequest>({
      query: (quarterlyFeedbackId) => ({
        url: `mentee/mentoring-journey/feedbacks/quarterly/feedback/${quarterlyFeedbackId}`,
        method: 'GET',
      }),
      onQueryStarted,
      providesTags: (result) => (result
        ? [{ type: 'Feedback', id: result.quarterlyFeedbackId }]
        : ['Feedback']),
    }),
    getMenteeSessionFeedback: build.query<SessionFeedbackResponse, string | number>({
      query: (sessionId) => ({
        url: `session/mentee/feedback/${sessionId}`,
        method: 'GET',
      }),
      onQueryStarted,
      providesTags: (result) => (result
        ? [{ type: 'Feedback', id: result.sessionId }]
        : ['Feedback']),
    }),
    answerMentorQuarterlyFeedback: build.mutation<null, AnswerFeedbackRequest>({
      query: (body) => ({
        url: `mentor/mentoring-journey/feedbacks/quarterly/feedback/${body.id}`,
        method: 'PUT',
        body: { feedbackAnswers: body.feedbackAnswers },
      }),
      invalidatesTags: (_result, _error, request) => [{ type: 'Feedback', id: request.id }, 'Feedbacks'],
      onQueryStarted,
    }),
    answerMentorSessionFeedback: build.mutation<null, AnswerFeedbackRequest>({
      query: (body) => ({
        url: `session/mentor/feedback/${body.id}`,
        method: 'PUT',
        body: { feedbackAnswers: body.feedbackAnswers },
      }),
      invalidatesTags: (_result, _error, request) => [{ type: 'Feedback', id: request.id }, 'Feedbacks'],
      onQueryStarted,
    }),
    answerMenteeQuarterlyFeedback: build.mutation<null, AnswerFeedbackRequest>({
      query: (body) => ({
        url: `mentee/mentoring-journey/feedbacks/quarterly/feedback/${body.id}`,
        method: 'PUT',
        body: { feedbackAnswers: body.feedbackAnswers },
      }),
      invalidatesTags: (_result, _error, request) => [{ type: 'Feedback', id: request.id }, 'Feedbacks'],
      onQueryStarted,
    }),
    answerMenteeSessionFeedback: build.mutation<null, AnswerFeedbackRequest>({
      query: (body) => ({
        url: `session/mentee/feedback/${body.id}`,
        method: 'PUT',
        body: { feedbackAnswers: body.feedbackAnswers },
      }),
      invalidatesTags: (_result, _error, request) => [{ type: 'Feedback', id: request.id }, 'Feedbacks'],
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
