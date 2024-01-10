import {
  Box, Button, Container, Flex, Hide, Image,
  Stack, Text,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import agapeLogo from '../../assets/agape_logo.png'
import loginIllustration from '../../assets/login_illustration.png'
import { Link, ControlledSelect, ControlledTextInput } from '../../components'
import paths from '../../paths'
import { validateEmail } from './utils'
import { useRegisterMutation } from '../../app/services/auth/apiAuthSlice'
import { RegisterRequest } from '../../app/services/auth/types'
import { Role } from '../../app/types'
import { useAppDispatch } from '../../hooks'
import { setToken } from '../../app/redux/appSlice'

interface Errors {
  role: string
  email: string
  password: string
  confirmPassword: string
}

const defaultErrors: Errors = {
  role: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const roleOptions: Role[] = ['Mentor', 'Mentee'] as const

function Register() {
  const dispatch = useAppDispatch()
  const [register] = useRegisterMutation()
  const [errors, setErrors] = useState<Errors>(defaultErrors)
  const roleRef = useRef<HTMLSelectElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  const handleRegister = async () => {
    if (!roleRef.current
      || !emailRef.current
      || !passwordRef.current
      || !confirmPasswordRef.current
    ) return

    const [role, email, password, confirmPassword] = [
      roleRef.current.value,
      emailRef.current.value,
      passwordRef.current.value,
      confirmPasswordRef.current.value,
    ]

    const errors = {
      ...defaultErrors,
    }

    if (!role) {
      errors.role = 'Please select a role'
    }
    if (password.length < 8) {
      errors.password = 'Password must be longer than 8 characters'
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email'
    }
    setErrors(errors)

    if (JSON.stringify(errors) !== JSON.stringify(defaultErrors)) return

    // TODO: Add api call
    const registerRequest: RegisterRequest = {
      role: role as Role,
      email,
      password,
    }

    const { token } = await register(registerRequest).unwrap()
    dispatch(setToken(token))
    // TODO: route to onboarding page
  }

  return (
    <Container maxWidth="container.xl" minHeight="100vh" justifyContent="center" display="flex" flexDirection="column" paddingY="8">
      <Flex>
        <Flex flex="1" justifyContent="center">
          <Box flex="1" flexDirection="column" maxW="480px">
            <Box>
              <Image src={agapeLogo} mb="4" />
            </Box>
            <Text fontSize="2xl" fontWeight="bold" mb="1">Registration</Text>
            <Text>Sign up for an account now!</Text>
            <Stack mt="12" spacing="8">
              <ControlledSelect ref={roleRef} error={errors.role} type="email" placeholder="Email" iconProps={{ name: 'person' }} options={roleOptions} />
              <ControlledTextInput ref={emailRef} error={errors.email} type="email" placeholder="Email" iconProps={{ name: 'email' }} />
              <ControlledTextInput ref={passwordRef} error={errors.password} type="password" placeholder="Password" iconProps={{ name: 'lock' }} />
              <ControlledTextInput ref={confirmPasswordRef} error={errors.confirmPassword} type="password" placeholder="Confirm Password" iconProps={{ name: 'lock' }} />
            </Stack>
            <Button onClick={handleRegister} w="100%" colorScheme="red" mt="16">Create Account</Button>
            <Flex justifyContent="center" mt="12">
              <Text>
                Already have an account?&nbsp;
                <Link fontWeight="500" color="red.600" to={paths.Login}>Go to login.</Link>
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

export default Register
