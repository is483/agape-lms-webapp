import {
  Box, Button, Flex, Text,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import paths from '../../../../paths'

function Introduction() {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate(paths.Onboarding.Mentor)
  }

  return (
    <Box>
      <Flex justifyContent="center" alignItems="center" flexDirection="column" height="100vh">
        <Text fontSize="5xl" fontWeight="600"> Welcome!</Text>
        <Text fontSize="xl" color="secondary.500"> We hope you’re as excited as us to start on your mentoring journey! </Text>
        <Button marginTop="8" colorScheme="red" onClick={handleButtonClick}>
          Start Onboarding
        </Button>

      </Flex>
    </Box>
  )
}
export default Introduction
