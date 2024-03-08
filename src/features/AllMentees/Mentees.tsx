import { useGetAllMenteesQuery } from '../../app/services/user/apiUserSlice'
import { Container } from '../../components'
import useBreakpoint from '../../hooks/useBreakpoint'
import { UsersList } from '../UsersList'

function Mentees() {
  const { data, isLoading } = useGetAllMenteesQuery(null)
  const isMdUp = useBreakpoint('md')
  if (isMdUp) {
    return (
      <Container>
        <UsersList
          title="All Mentees"
          description="View and manage all mentees on the platform"
          users={isLoading ? [] : data ?? []}
          userRole="Admin"
        />
      </Container>
    )
  }
  return (
    <UsersList
      title="All Mentees"
      description="View and manage all mentees on the platform"
      users={isLoading ? [] : data ?? []}
      userRole="Admin"
    />
  )
}
export default Mentees
