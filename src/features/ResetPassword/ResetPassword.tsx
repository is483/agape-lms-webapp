import {
  Box, Button, Container, Flex, Hide, Image,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import agapeLogo from '../../assets/agape_logo.png'
import loginIllustration from '../../assets/login_illustration.png'
import { ControlledTextInput, Link } from '../../components'
import paths from '../../paths'
import { useResetPasswordMutation, useVerifyResetTokenMutation } from '../../app/services/auth/apiAuthSlice'
import { ResetPasswordRequest } from '../../app/services/auth/types'
import { jsonDeepEqualityCheck } from '../Register/utils'

interface Errors {
  password: string
  confirmPassword: string
  serverError: string
}

const defaultErrors = {
  password: '',
  confirmPassword: '',
  serverError: '',
}

function ResetPassword() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation()
  const [verifyToken] = useVerifyResetTokenMutation()
  const [searchParams] = useSearchParams()
  const [fullName, setFullName] = useState('')
  const navigate = useNavigate()
  const toast = useToast()
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const [errors, setErrors] = useState<Errors>(defaultErrors)
  const resetToken = searchParams.get('token')

  useEffect(() => {
    if (!resetToken) {
      navigate(paths.Login)
      return
    }

    async function fetchResetTokenValidity() {
      try {
        const { successful, fullName, error } = await verifyToken({ token: resetToken! }).unwrap()
        if (successful) {
          setFullName(fullName)
          return
        }
        setErrors({ ...defaultErrors, serverError: error })
      } catch (e) {
        console.error(e)
        setErrors({ ...defaultErrors, serverError: 'Internal Server Error. Please try again later or contact us.' })
      }
    }

    fetchResetTokenValidity()
  }, [navigate, resetToken, verifyToken])

  const handleSubmit = async () => {
    if (!passwordRef.current || !confirmPasswordRef.current) return
    const [password, confirmPassword] = [
      passwordRef.current.value,
      confirmPasswordRef.current.value,
    ]
    const errors = { ...defaultErrors }
    if (password.length < 8) {
      errors.password = 'Password must be 8 characters or longer'
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    setErrors(errors)
    if (jsonDeepEqualityCheck(errors, defaultErrors)) return

    try {
      const forgetPasswordRequest: ResetPasswordRequest = {
        password,
      }
      await resetPassword(forgetPasswordRequest).unwrap()
      toast({
        title: 'Password Reset Successful',
        description: 'Your password has been successfully reset. You may proceed to login with your new credentials.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      })
    } catch (e) {
      console.error(e)
      setErrors({ ...defaultErrors, serverError: 'Internal Server Error. Please try again later or contact us.' })
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
            <Text fontSize="2xl" fontWeight="bold" mb="1">Change Password</Text>
            <Text mb="10">
              {
                !!fullName
                && <Box as="span" display="inline" marginRight="1">Welcome back <Text as="span" color="red.700" fontWeight="600" display="inline">{fullName}</Text>!</Box>
              }
              Enter your new password below
            </Text>
            <Stack gap="6">
              <ControlledTextInput ref={passwordRef} error={errors.password} type="password" placeholder="Password" iconProps={{ name: 'lock' }} />
              <ControlledTextInput ref={confirmPasswordRef} error={errors.confirmPassword} type="password" placeholder="Confirm Password" iconProps={{ name: 'lock' }} />
            </Stack>
            <Text mt="6" fontSize="xs" color="red.600">{errors.serverError}</Text>
            <Button isDisabled={!!errors.serverError} isLoading={isLoading} onClick={handleSubmit} w="100%" colorScheme="red" mt="8">Submit</Button>
            <Flex justifyContent="center" mt="12">
              <Text>
                Have an account?&nbsp;
                <Link fontWeight="500" color="red.600" to={paths.Register}>Go to login.</Link>
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

export default ResetPassword
