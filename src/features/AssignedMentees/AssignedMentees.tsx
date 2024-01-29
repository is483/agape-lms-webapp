import { Container } from '../../components'
import { UsersList } from '../UsersList'

function AssignedMentees() {
  // TODO: Fetch users list
  // TODO: Pass it into UsersList

  return (
    <Container>
      <UsersList
        title="Assigned Mentees"
        description="Get to know more about your assigned mentees"
        users={[]}
      />
    </Container>
  )
}

export default AssignedMentees
