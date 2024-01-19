import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

/*
  Empty api slice.
  Use injectEndpoints to add endpoints
*/

const apiVersion = 1
// const baseUrl = 'https://agape-lms-hmwzd56c5a-as.a.run.app'
const baseUrl = 'http://localhost:8080'
export const apiUrl = `${baseUrl}/api/v${apiVersion}/`

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
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
