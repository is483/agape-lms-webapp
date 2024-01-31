import { useGetAssignedMenteesQuery } from '../app/services/user/apiUserSlice'

function useAssignedMenteesOptions() {
  const {
    data, isLoading, isError, isFetching,
  } = useGetAssignedMenteesQuery(null)

  if (isLoading || isError || isFetching) return []

  return data?.assignedMentees.map((assignedMentee) => `${assignedMentee.firstName ?? ''} ${assignedMentee.lastName ?? ''}`) ?? []
}

export default useAssignedMenteesOptions
