import { useGetAssignedMenteesQuery } from '../../app/services/user/apiUserSlice'
import { Container } from '../../components'
import { UsersList } from '../UsersList'

function AssignedMentees() {
  const { data, isLoading } = useGetAssignedMenteesQuery(null)
  return (
    <Container>
      <UsersList
        title="Assigned Mentees"
        description="Get to know more about your assigned mentees"
        users={isLoading ? [] : data?.assignedMentees ?? []}
      />
    </Container>
  )
}

export default AssignedMentees
