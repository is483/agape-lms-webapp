import { apiSlice } from '../apiSlice'
import { defaultOnQueryStarted as onQueryStarted } from '../utils'
import { MentorSessionFeedbackResponse } from './type'

const apiFeedbackSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getMentorSessionFeedback: build.query<MentorSessionFeedbackResponse, null>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      onQueryStarted,
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetMentorSessionFeedbackQuery,
} = apiFeedbackSlice
