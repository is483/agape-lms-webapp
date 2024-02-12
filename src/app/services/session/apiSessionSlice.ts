import { apiSlice } from '../apiSlice'
import { SessionDetailsResponse, SessionResponse } from './types'
import { defaultOnQueryStarted as onQueryStarted } from '../utils'

const apiSessionSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // for Mentor
    getMenteeSessions: build.query<SessionResponse, string | number>({
      query: (menteeId) => ({
        url: `/session/${menteeId}`,
        method: 'GET',
      }),
      onQueryStarted,
    }),
    // for Mentee
    getSessions: build.query<SessionResponse, null>({
      query: () => ({
        url: '/session',
        method: 'GET',
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

    deleteSession: build.mutation<null, string | number>({
      query: (sessionId) => ({
        url: `/session/mentee/details/${sessionId}`,
        method: 'DELETE',
      }),
      onQueryStarted,
    }),
  }),
  overrideExisting: false,
})

export const {
  useLazyGetMenteeSessionsQuery,
  useLazyGetSessionDetailsMentorQuery,
  useLazyGetSessionDetailsMenteeQuery,
  useLazyGetSessionsQuery,
  useDeleteSessionMutation,
} = apiSessionSlice
