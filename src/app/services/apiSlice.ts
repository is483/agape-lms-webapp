import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/*
  Empty api slice.
  Use injectEndpoints to add endpoints
*/
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['User'],
  endpoints: () => ({}),
})
