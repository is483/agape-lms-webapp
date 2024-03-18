import {
  Box, Text, FormControl, Input, FormLabel, SimpleGrid,
  Flex, Circle, Button, FlexProps, Image, useToast,
} from '@chakra-ui/react'
import {
  ChangeEvent, useEffect, useRef, useState,
} from 'react'
import { ControlledSelect, ControlledTextInput, Icon } from '../../../../components'
import { useUpdateMenteeInfoMutation, useUpdateMentorInfoMutation } from '../../../../app/services/user/apiUserSlice'
import { InfoRequest, TransformedUserResponse } from '../../../../app/services/user/types'
import { getAuth } from '../../../../app/redux/selectors'
import { useAppSelector } from '../../../../hooks'
import { deepCopy } from '../../../../utils'

interface Props extends FlexProps {
  handleNext?: () => void
  data: TransformedUserResponse | undefined
}

interface Errors {
  image: string
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  phoneNumber: string
}

const defaultErrors: Errors = {
  image: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  phoneNumber: '',
}

const genderOptions = ['Male', 'Female']

function PersonalInformation(props: Props) {
  const { handleNext, data, ...rest } = props
  const [updateMentorInfo, { isLoading: isMentorInfoLoading }] = useUpdateMentorInfoMutation()
  const [updateMenteeInfo, { isLoading: isMenteeInfoLoading }] = useUpdateMenteeInfoMutation()
  const { role } = useAppSelector(getAuth)
  const toast = useToast()
  const inputImageRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<string>('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [errors, setErrors] = useState<Errors>(defaultErrors)

  useEffect(() => {
    if (!data) return
    setFirstName(data.firstName)
    setLastName(data.lastName)
    setDateOfBirth(data.dateOfBirth)
    setGender(data.gender)
    setPhoneNumber(data.phoneNumber)
    setImage(data.profileImgURL)
  }, [data])

  const handleAddImageClick = () => {
    inputImageRef.current?.click()
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    const [file] = files

    const fileSize = file.size / 1024 / 1024 // in MiB
    if (fileSize > 1) {
      setErrors({ ...defaultErrors, image: '1mb file size limit exceeded' })
      return
    }

    setErrors({ ...defaultErrors, image: '' })

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result)
      }
    }
  }

  const removeImage = () => {
    setImage('')
  }

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const firstName = e.target.value
    setFirstName(firstName)
  }

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const lastName = e.target.value
    setLastName(lastName)
  }

  const handleDateOfBirth = (e: ChangeEvent<HTMLInputElement>) => {
    const dateOfBirth = e.target.value
    setDateOfBirth(dateOfBirth)
  }

  const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const gender = e.target.value
    setGender(gender)
  }

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value
    if (/^\d*$/.test(phoneNumber)) {
      setPhoneNumber(phoneNumber)
    }
  }

  const handleSave = async () => {
    const newErrors = deepCopy(defaultErrors)
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (firstName.length > 50) {
      newErrors.firstName = `First name must not exceed 50 characters (${firstName.length} / 50)`
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (lastName.length > 50) {
      newErrors.lastName = `Last name must not exceed 50 characters (${lastName.length} / 50)`
    }
    if (!dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required'
    }
    if (!gender) {
      newErrors.gender = 'Gender is required'
    }
    if (phoneNumber.trim().length < 8 || phoneNumber.trim().length > 8) {
      newErrors.phoneNumber = 'Please enter a valid 8 digit phone number'
    }
    setErrors(newErrors)
    const hasErrors = Object.values(newErrors).some((error) => error !== '')
    if (hasErrors) {
      return
    }
    const updateInfo = role === 'Mentor' ? updateMentorInfo : updateMenteeInfo
    const infoRequest: InfoRequest = {
      firstName,
      lastName,
      dateOfBirth: new Date(dateOfBirth).toISOString(),
      gender,
      phoneNumber,
      profileImg: image,
    }
    try {
      await updateInfo(infoRequest).unwrap()
      if (!handleNext) {
        toast({
          title: 'Personal Information',
          description: 'Your changes has been saved!',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'bottom-right',
        })
      } else {
        handleNext()
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Flex {...rest}>
      <Box>
        <Text fontSize="2xl" fontWeight="600"> Personal Information </Text>
        <Text color="secondary.500" marginTop="1"> Let&apos;s set up your profile! </Text>
        <Flex marginY="8" gap="5">
          <Box>
            {image
              ? <Image background="gray" rounded="full" src={image} width="70px" height="70px" />
              : (
                <Circle size="70px" bg="secondary.100">
                  <Icon name="person" color="secondary.500" />
                </Circle>
              )}
            {errors.image && <Text position="absolute" fontSize="xs" color="red.600">{errors.image}</Text>}
          </Box>
          <Box flex="1">
            <FormControl>
              <FormLabel>Display Picture</FormLabel>
              <Input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleImageChange}
                display="none"
                ref={inputImageRef}
              />
              <Button onClick={handleAddImageClick}>Add Image</Button>
              <Button onClick={removeImage} variant="ghost" marginStart="2">Remove Image</Button>
            </FormControl>
          </Box>
        </Flex>
        <SimpleGrid columns={[1, null, 2]} spacing="4" spacingY="55" marginTop="16">
          <Box>
            <ControlledTextInput label="First Name" inputProps={{ onChange: handleFirstNameChange, value: firstName }} error={errors.firstName} type="text" />
          </Box>
          <Box>
            <ControlledTextInput label="Last Name" inputProps={{ onChange: handleLastNameChange, value: lastName }} error={errors.lastName} type="text" />
          </Box>
          <Box>
            <ControlledTextInput label="Date of Birth" inputProps={{ onChange: handleDateOfBirth, value: dateOfBirth }} error={errors.dateOfBirth} type="date" />
          </Box>
          <Box>
            <ControlledSelect selectProps={{ onChange: handleGenderChange, value: gender }} error={errors.gender} options={genderOptions} label="Gender" />
          </Box>
          <Box>
            <ControlledTextInput label="Phone Number" inputProps={{ onChange: handleNumberChange, value: phoneNumber }} error={errors.phoneNumber} type="text" />
          </Box>
        </SimpleGrid>
      </Box>
      <Flex justifyContent="end" gap="4" my="8">
        <Button colorScheme="red" onClick={handleSave} isLoading={role === 'Mentor' ? isMentorInfoLoading : isMenteeInfoLoading}>{handleNext ? 'Next' : 'Save'}</Button>
      </Flex>
    </Flex>
  )
}

PersonalInformation.defaultProps = {
  handleNext: undefined,
}

export default PersonalInformation
