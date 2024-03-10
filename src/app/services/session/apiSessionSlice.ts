import { apiSlice } from '../apiSlice'
import {
  CreateSessionRequest, EditSessionRequest,
  SessionDetailsResponse, SessionResponse,
  DeclineSessionRequest,
  DeclineReasonResponse,
  UpdateSessionRequest,
  UpdateSessionNotesRequest,
  AllSessionsByMentoringJourneyResponse,
} from './types'
import { defaultOnQueryStarted as onQueryStarted } from '../utils'

const apiSessionSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // for Mentor
    getMenteeSessions: build.query<SessionResponse, string | number>({
      query: (menteeId) => ({
        url: `/session/${menteeId}`,
        method: 'GET',
        providesTags: ['Sessions'],
      }),
      onQueryStarted,
    }),
    // for Mentee
    getSessions: build.query<SessionResponse, null>({
      query: () => ({
        url: '/session',
        method: 'GET',
        providesTags: ['Sessions'],
      }),
      onQueryStarted,
    }),
    acceptSession: build.mutation<null, string | number>({
      query: (sessionId) => ({
        url: `/session/pending/confirm/${sessionId}`,
        method: 'PUT',
        invalidatesTags: ['Sessions'],

      }),
      onQueryStarted,
    }),

    declineSession: build.mutation<null, DeclineSessionRequest>({
      query: (request) => ({
        url: `/session/pending/reject/${request.sessionId}`,
        method: 'PUT',
        invalidatesTags: ['Sessions'],
        body: request.body,
      }),
      onQueryStarted,
    }),
    createSession: build.mutation<null, CreateSessionRequest>({
      query: (request) => ({
        url: `/session/create/${request.menteeId}`,
        method: 'POST',
        body: request.body,
      }),
      onQueryStarted,
    }),

    getSessionDetailsMentor: build.query<SessionDetailsResponse, string | number>({
      query: (sessionId) => ({
        url: `/session/mentor/details/${sessionId}`,
        method: 'GET',
      }),
      onQueryStarted,
    }),

    getSessionDetailsMentee: build.query<SessionDetailsResponse, string | number>({
      query: (sessionId) => ({
        url: `/session/mentee/details/${sessionId}`,
        method: 'GET',
      }),
      onQueryStarted,
    }),

    editSession: build.mutation<null, EditSessionRequest>({
      query: (request) => ({
        url: `/session/mentor/details/${request.sessionId}`,
        method: 'PUT',
        body: request.body,
      }),
      onQueryStarted,
    }),

    deleteSession: build.mutation<null, string | number>({
      query: (sessionId) => ({
        url: `/session/mentor/details/${sessionId}`,
        method: 'DELETE',
      }),
      onQueryStarted,
    }),

    getDeclineReason: build.query<DeclineReasonResponse, string | number>({
      query: (sessionId) => ({
        url: `/session/pending/reject/reason/${sessionId}`,
        method: 'GET',
      }),
      onQueryStarted,
    }),

    updateSession: build.mutation<null, UpdateSessionRequest>({
      query: (request) => ({
        url: `/session/pending/reject/reason/${request.sessionId}`,
        method: 'PUT',
        body: request.body,
      }),
      onQueryStarted,
    }),

    updateSessionNotes: build.mutation<null, UpdateSessionNotesRequest>({
      query: (request) => ({
        url: `/session/notes/${request.sessionId}`,
        method: 'PUT',
        body: request.body,
      }),
      onQueryStarted,
    }),

    // Admin
    getAllSessionsByMentoringJourney: build.query<AllSessionsByMentoringJourneyResponse, string | number>({
      query: (mentoringJourneyId) => ({
        url: `admin/view-mentoring-journeys/sessions/${mentoringJourneyId}`,
        method: 'GET',
      }),
      onQueryStarted,
    }),
  }),
  overrideExisting: false,
})

export const {
  useLazyGetMenteeSessionsQuery,
  useCreateSessionMutation,
  useAcceptSessionMutation,
  useDeclineSessionMutation,
  useLazyGetSessionDetailsMentorQuery,
  useLazyGetSessionDetailsMenteeQuery,
  useLazyGetSessionsQuery,
  useEditSessionMutation,
  useDeleteSessionMutation,
  useGetDeclineReasonQuery,
  useUpdateSessionMutation,
  useUpdateSessionNotesMutation,
  useGetAllSessionsByMentoringJourneyQuery,
} = apiSessionSlice
