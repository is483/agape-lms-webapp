import { useGetUnassignedMenteesQuery } from '../app/services/user/apiUserSlice'

function useUnassignedMenteesOptions() {
  const {
    data, isLoading, isError, isFetching,
  } = useGetUnassignedMenteesQuery(null)

  if (isLoading || isError || isFetching) {
    return {
      options: [],
      menteeIdToMenteeName: {},
    }
  }

  const menteeIdToMenteeName: Record<string, string> = {}

  return {
    options: data?.unassignedMentees.map(({ firstName, lastName, menteeId }) => {
      const fullName = `${firstName ?? ''} ${lastName ?? ''}`
      menteeIdToMenteeName[menteeId] = fullName
      return { value: menteeId.toString(), children: fullName }
    }) ?? [],
    menteeIdToMenteeName,
  }
}

export default useUnassignedMenteesOptions
