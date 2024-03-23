import { useGetUnAssignedMenteesAdminQuery } from '../app/services/user/apiUserSlice'

function useAdminUnassignedMenteesOptions() {
  const {
    data, isLoading, isError, isFetching,
  } = useGetUnAssignedMenteesAdminQuery(null)

  if (isLoading || isError || isFetching) {
    return {
      options: [],
      menteeIdToMenteeName: {},
    }
  }

  const menteeIdToMenteeName: Record<string, string> = {}

  return {
    options: data?.map(({ firstName, lastName, userId }) => {
      const fullName = `${firstName ?? ''} ${lastName ?? ''}`
      menteeIdToMenteeName[userId] = fullName
      return { value: userId.toString(), children: fullName }
    }) ?? [],
    menteeIdToMenteeName,
  }
}

export default useAdminUnassignedMenteesOptions
