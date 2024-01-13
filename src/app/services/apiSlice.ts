import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

/*
  Empty api slice.
  Use injectEndpoints to add endpoints
*/

const apiVersion = 1

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://agape-lms-hmwzd56c5a-as.a.run.app/api/v${apiVersion}/`,
    prepareHeaders: (headers, { getState }) => {
      const appState = (getState() as RootState).app
      const localStorageToken = localStorage.getItem('token')
      const { token } = appState.auth
      const loginToken = token ?? localStorageToken

      if (loginToken) {
        headers.set('authorization', `Bearer ${loginToken}`)
      }

      return headers
    },
  }),
  tagTypes: ['User'],
  endpoints: () => ({}),
})
