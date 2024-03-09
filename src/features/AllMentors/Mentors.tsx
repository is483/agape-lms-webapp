import { useGetAllMentorsQuery } from '../../app/services/user/apiUserSlice'
import { Container } from '../../components'
import useBreakpoint from '../../hooks/useBreakpoint'
import { UsersList } from '../UsersList'

function Mentors() {
  const { data, isLoading } = useGetAllMentorsQuery(null)
  const isMdUp = useBreakpoint('md')
  if (isMdUp) {
    return (
      <Container>
        <UsersList
          title="All Mentors"
          description="View and manage all mentees on the platform"
          users={isLoading ? [] : data ?? []}
          userRole="Admin"
        />
      </Container>
    )
  }
  return (
    <UsersList
      title="All Mentors"
      description="View and manage all mentors on the platform"
      users={isLoading ? [] : data ?? []}
      userRole="Admin"
    />
  )
}
export default Mentors
