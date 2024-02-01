import { useGetAssignedMenteesQuery } from '../app/services/user/apiUserSlice'

function useAssignedMenteesOptions() {
  const {
    data, isLoading, isError, isFetching,
  } = useGetAssignedMenteesQuery(null)

  if (isLoading || isError || isFetching) {
    return {
      options: [],
      menteeIdToMenteeName: {},
    }
  }

  const menteeIdToMenteeName: Record<string, string> = {}

  return {
    options: data?.assignedMentees.map(({ firstName, lastName, menteeId }) => {
      const fullName = `${firstName ?? ''} ${lastName ?? ''}`
      menteeIdToMenteeName[menteeId] = fullName
      return { value: menteeId.toString(), children: fullName }
    }) ?? [],
    menteeIdToMenteeName,
  }
}

export default useAssignedMenteesOptions
