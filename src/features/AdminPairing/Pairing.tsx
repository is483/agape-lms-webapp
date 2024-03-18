import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import { Container } from '../../components'

function Pairing() {
  return (
    <Container minHeight="calc(100vh - 32px)">
      <Box padding="5">
        <Text fontSize="2xl" fontWeight="600"> Pairing of Mentors and Mentees </Text>
        <Text color="secondary.500"> Utilize this section to assign mentors to mentees, crafting the ideal pairing</Text>
      </Box>
      <Divider />
      <Flex>
        <Box flex="3">
          <Text> Mentors</Text>
        </Box>
        <Box flex="2">
          <Text> Mentees</Text>
        </Box>

      </Flex>
    </Container>
  )
}

export default Pairing
