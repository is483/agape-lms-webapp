import { useGetAllMentorsQuery } from '../app/services/user/apiUserSlice'

function useAllMentorOptions() {
  const {
    data, isLoading, isError, isFetching,
  } = useGetAllMentorsQuery(null)

  if (isLoading || isError || isFetching) {
    return {
      options: [{ value: '0', children: 'View All' }],
      mentorIdToMentorName: {},
    }
  }

  const mentorIdToMentorName: Record<string, string> = {}
  const options = data?.map(({ firstName, lastName, userId }) => {
    const fullName = `${firstName ?? ''} ${lastName ?? ''}`
    mentorIdToMentorName[userId] = fullName
    return { value: userId.toString(), children: fullName }
  }) ?? []

  options.unshift({ value: '0', children: 'View All' })

  return {
    options,
    mentorIdToMentorName,
  }
}

export default useAllMentorOptions
