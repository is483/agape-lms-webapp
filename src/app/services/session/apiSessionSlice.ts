import { apiSlice } from '../apiSlice'
import { CreateSessionRequest, SessionResponse } from './types'
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

    createSession: build.mutation<null, CreateSessionRequest>({
      query: (request) => ({
        url: `/session/create/${request.mentoringJourneyId}`,
        method: 'POST',
        body: request.body,
      }),
      onQueryStarted,
    }),

  }),
  overrideExisting: false,
})

export const {
  useLazyGetMenteeSessionsQuery, useLazyGetSessionsQuery,
  useCreateSessionMutation,
} = apiSessionSlice
