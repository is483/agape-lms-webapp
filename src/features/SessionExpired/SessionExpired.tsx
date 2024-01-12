import {
  Button, Container, Image,
  Stack, Text,
} from '@chakra-ui/react'
import maintenance from '../../assets/maintenance.png'
import { Link } from '../../components'
import paths from '../../paths'

function SessionExpired() {
  return (
    <Container maxWidth="container.xl" minHeight="100vh" justifyContent="center" alignItems="center" display="flex" paddingY="8">
      <Stack width="90%" maxWidth="480px" gap="4" alignItems="center" justifyContent="center">
        <Image src={maintenance} mb="4" />
        <Text textAlign="center" color="secondary.500">
          We&apos;ve noticed that you have been gone awhile, so we have logged you out.
          Please click on the button below to login again!
        </Text>
        <Link to={paths.Login} marginTop="12" width="70%">
          <Button colorScheme="red" width="100%">Log in again</Button>
        </Link>
      </Stack>
    </Container>
  )
}

export default SessionExpired
