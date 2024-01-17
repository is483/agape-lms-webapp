import {
  Box, Button, Container, Flex, Hide, Image,
  Input, InputGroup, InputLeftElement, Stack, Text,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import agapeLogo from '../../assets/agape_logo.png'
import loginIllustration from '../../assets/login_illustration.png'
import { Icon, Link } from '../../components'
import paths from '../../paths'
import { useLoginMutation, useVerifyOnboardingStatusMutation } from '../../app/services/auth/apiAuthSlice'
import { LoginRequest } from '../../app/services/auth/types'

function Login() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const [verifyOnboardingStatus] = useVerifyOnboardingStatusMutation()
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) return
    setError('')
    const email = emailRef.current.value
    const password = passwordRef.current.value

    const loginRequest: LoginRequest = {
      email,
      password,
    }

    try {
      await login(loginRequest).unwrap()
      const { onboardingComplete, onboardingStep } = await verifyOnboardingStatus(null).unwrap()
      if (!onboardingComplete) {
        if (onboardingStep === '1') {
          navigate(`${paths.Introduction}`)
          return
        }
        navigate(`${paths.Onboarding}/${onboardingStep}`)
      } else {
        // TODO: navigate to main page for role
      }
    } catch (e: any) {
      console.error(e)
      if (e?.status < 500) {
        setError('Invalid credentials')
      }
    }
  }

  return (
    <Container maxWidth="container.xl" minHeight="100vh" justifyContent="center" display="flex" flexDirection="column" paddingY="8">
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
              <Link fontWeight="500" color="red.600" to={paths.ForgetPassword}>Forgot Password?</Link>
            </Flex>
            {!!error && <Text position="absolute" fontSize="xs" color="red.600">{error}</Text>}
            <Button isLoading={isLoading} onClick={handleLogin} w="100%" colorScheme="red" mt="16">Login</Button>
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
