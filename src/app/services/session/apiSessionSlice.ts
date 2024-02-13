import { apiSlice } from '../apiSlice'
import { DeclineSessionRequest, SessionDetailsResponse, SessionResponse } from './types'
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
  }),
  overrideExisting: false,
})

export const {
  useLazyGetMenteeSessionsQuery,
  useAcceptSessionMutation, useDeclineSessionMutation,
  useLazyGetSessionDetailsMentorQuery,
  useLazyGetSessionDetailsMenteeQuery,
  useLazyGetSessionsQuery,
} = apiSessionSlice
