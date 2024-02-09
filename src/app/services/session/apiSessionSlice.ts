import { apiSlice } from '../apiSlice'
import { SessionResponse } from './types'
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
  }),
  overrideExisting: false,
})

export const { useLazyGetMenteeSessionsQuery, useLazyGetSessionsQuery } = apiSessionSlice
