import {
  Box, Button, Container, Flex, Hide, Image,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import agapeLogo from '../../assets/agape_logo.png'
import loginIllustration from '../../assets/login_illustration.png'
import { ControlledTextInput, Link } from '../../components'
import paths from '../../paths'
import { useForgetPasswordMutation } from '../../app/services/auth/apiAuthSlice'
import { ForgetPasswordRequest } from '../../app/services/auth/types'
import { isValidEmail, jsonDeepEqualityCheck } from '../Register/utils'

interface Errors {
  email: string
}

const defaultErrors = {
  email: '',
}

function ForgetPassword() {
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation()
  const toast = useToast()
  const emailRef = useRef<HTMLInputElement>(null)
  const [errors, setErrors] = useState<Errors>(defaultErrors)

  const handleSubmit = async () => {
    if (!emailRef.current) return
    const email = emailRef.current.value
    const errors = { ...defaultErrors }
    if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email'
    }
    setErrors(errors)
    if (jsonDeepEqualityCheck(errors, defaultErrors)) return

    try {
      const forgetPasswordRequest: ForgetPasswordRequest = {
        email,
      }
      await forgetPassword(forgetPasswordRequest).unwrap()
      toast({
        title: 'Email Sent',
        description: 'If this email exists, we have sent out a link to reset your password!',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      })
    } catch (e) {
      console.error(e)
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
            <Text fontSize="2xl" fontWeight="bold" mb="1">Forgot Password</Text>
            <Text mb="10">
              Provide your email address and we&apos;ll
              send you an email with instructions on how to retrieve it.
            </Text>
            <ControlledTextInput ref={emailRef} error={errors.email} type="email" placeholder="Email" iconProps={{ name: 'email' }} />
            <Button isLoading={isLoading} onClick={handleSubmit} w="100%" colorScheme="red" mt="16">Submit</Button>
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

export default ForgetPassword
