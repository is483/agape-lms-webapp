import {
  Box, Hide, Text, Divider,
} from '@chakra-ui/react'
import { useGetAssignedMentorQuery } from '../../app/services/user/apiUserSlice'
import { Container } from '../../components'
import UserDetails from '../UsersList/UserDetails'

function Mentor() {
  const { data } = useGetAssignedMentorQuery(null)
  return (
    <Container minHeight="calc(100vh - 32px)">
      <Box marginBottom="5">
        <Box padding="5">
          <Text fontSize="2xl" fontWeight="600"> Mentor Profile </Text>
          <Text color="secondary.500"> Meet your assigned mentor who will be undergoing this journey with you </Text>
        </Box>
        <Hide below="md">
          <Divider orientation="horizontal" />
        </Hide>
      </Box>
      {!data && (
        <Box padding="5">
          <Text> Oops, you do not have an assigned mentor at the moment. Check back again or contact Agape!</Text>
        </Box>
      )}
      {data && <UserDetails user={data.assignedMentor} userRole="Mentor" />}
    </Container>
  )
}
export default Mentor
