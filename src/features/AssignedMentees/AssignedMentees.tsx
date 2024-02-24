import { useGetAssignedMenteesQuery } from '../../app/services/user/apiUserSlice'
import { Container } from '../../components'
import useBreakpoint from '../../hooks/useBreakpoint'
import { UsersList } from '../UsersList'

function AssignedMentees() {
  const { data, isLoading } = useGetAssignedMenteesQuery(null)
  const isMdUp = useBreakpoint('md')
  if (isMdUp) {
    return (
      <Container>
        <UsersList
          title="Assigned Mentees"
          description="Get to know more about your assigned mentees"
          users={isLoading ? [] : data?.assignedMentees ?? []}
          userRole="Mentee"
        />
      </Container>
    )
  }
  return (
    <UsersList
      title="Assigned Mentees"
      description="Get to know more about your assigned mentees"
      users={isLoading ? [] : data?.assignedMentees ?? []}
      userRole="Mentee"
    />
  )
}

export default AssignedMentees
