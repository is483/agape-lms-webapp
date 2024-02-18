import { Box, Hide, Text, Divider } from '@chakra-ui/react'
import { useGetAssignedMentorQuery } from '../../app/services/user/apiUserSlice'
import { Container } from '../../components'
import UserDetails from '../UsersList/UserDetails'

function AssignedMentors() {
  const { data } = useGetAssignedMentorQuery(null)
  console.log(data)
  return (
    <Container>
      <Box marginBottom="5">
        <Box padding="5">
          <Text fontSize="2xl" fontWeight="600"> Mentor Profile </Text>
          <Text color="secondary.500"> Meet your assigned mentor who will be undergoing this journey with you </Text>
        </Box>
        <Hide below="md">
          <Divider orientation="horizontal" />
        </Hide>
      </Box>
      { data && <UserDetails user={data.assignedMentor} /> }
    </Container>
  )
}
export default AssignedMentors
