import { apiSlice } from '../apiSlice'
import {
  CreateSessionRequest, EditSessionRequest,
  SessionDetailsResponse, SessionResponse,
  DeclineSessionRequest,
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
} = apiSessionSlice
