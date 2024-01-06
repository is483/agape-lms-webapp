import {
  Box, Button, Container, Flex, Hide, Image,
  Input, InputGroup, InputLeftElement, Stack, Text,
} from '@chakra-ui/react'
import { useRef } from 'react'
import agapeLogo from '../../assets/agape_logo.png'
import loginIllustration from '../../assets/login_illustration.png'
import { Icon, Link } from '../../components'
import paths from '../../paths'

function Login() {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handleLogin = () => {

  }

  return (
    <Container maxWidth="container.xl" minHeight="100vh" justifyContent="center" display="flex" flexDirection="column">
      <Flex>
        <Flex flex="1" justifyContent="center">
          <Box flex="1" flexDirection="column" maxW="480px">
            <Box>
              <Image src={agapeLogo} mb="4" />
            </Box>
            <Text fontSize="2xl" fontWeight="bold" mb="1">Log in to your Account</Text>
            <Text>Welcome back, sign in here!</Text>
            <Stack mt="12" spacing="8">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon color="secondary.500" name="email" />
                </InputLeftElement>
                <Input ref={emailRef} type="email" placeholder="Email" />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon color="secondary.500" name="lock" />
                </InputLeftElement>
                <Input ref={passwordRef} type="password" placeholder="Password" />
              </InputGroup>
            </Stack>
            <Flex justifyContent="end" mt="1">
              <Link fontWeight="500" color="red.600" to={paths.Login}>Forgot Password?</Link>
            </Flex>
            <Button onClick={handleLogin} w="100%" colorScheme="red" mt="16">Login</Button>
            <Flex justifyContent="center" mt="12">
              <Text>
                New here?&nbsp;
                <Link fontWeight="500" color="red.600" to={paths.Register}>Create an account.</Link>
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Hide below="md">
          <Flex flexDirection="column" flex="1" justifyContent="center" alignItems="center">
            <Image src={loginIllustration} width="480px" />
            <Text fontWeight="bold">Kickstart your transformation today</Text>
          </Flex>
        </Hide>
      </Flex>
    </Container>
  )
}

export default Login
