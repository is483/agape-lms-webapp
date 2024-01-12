import {
  Box, Text, FormControl, Input, FormLabel, SimpleGrid,
  Select, NumberInputField, NumberInput, Flex, Circle, Button,
} from '@chakra-ui/react'
import React, { ChangeEvent, useState } from 'react'
import { ControlledSelect, ControlledTextInput, Icon } from '../../../../components'

interface Props {
  handleBack: () => void
  handleNext: () => void
}

interface Errors {
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  phoneNumber: string
}

const defaultErrors: Errors = {
  firstName: 'No first name included',
  lastName: 'No last name included',
  dateOfBirth: 'No date of birth selected',
  gender: 'No gender selected',
  phoneNumber: 'No phone number included'

}

const genderOptions = ['Male', 'Female']


function PersonalInformation(props: Props) {
  const { handleBack, handleNext } = props
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [errors, setErrors] = useState<Errors>(defaultErrors)

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
    setPhoneNumber(phoneNumber)
  }

  const handleSave = () => {
    // TODO: include api call to save changes
    handleNext()
  }

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="600"> Personal Information </Text>
      <Text color="secondary.500" marginTop="1"> Let&apos;s set up your profile! </Text>
      <Flex marginY="8" gap="5">
        <Box>
          <Circle size="70px" bg="secondary.100">
            <Icon name="person" color="secondary.500" />
          </Circle>
        </Box>
        <Box flex="1">
          <FormControl>
            <FormLabel>Display Picture</FormLabel>
            <Input
              type="file"
            />
          </FormControl>
        </Box>
      </Flex>
      <SimpleGrid columns={[1, null, 2]} spacing="4" spacingY="55">
        <Box>
          <ControlledTextInput label="First Name" inputProps={{ onChange: handleFirstNameChange, value: firstName }} error={errors.firstName} type={'text'} placeholder={''} />
        </Box>
        <Box>
          <ControlledTextInput label="Last Name" inputProps={{ onChange: handleLastNameChange, value: lastName }} error={errors.lastName} type={'text'} placeholder={''} />
        </Box>

        <Box>
          <ControlledTextInput label="Date of Birth" inputProps={{ onChange: handleDateOfBirth, value: dateOfBirth }} error={errors.dateOfBirth} type={'date'} placeholder={''} />
        </Box>

        <Box>
          <ControlledSelect placeholder="Select gender" selectProps={{ onChange: handleGenderChange, value: gender }} error={errors.gender} options={genderOptions} label='Gender' />
        </Box>
        <Box>
          <ControlledTextInput label="Phone Number" inputProps={{ onChange: handleNumberChange, value: phoneNumber }} error={errors.phoneNumber} type={'number'} placeholder={''} />
        </Box>
      </SimpleGrid>
      <Flex justifyContent="end" gap="4">
        <Button onClick={handleBack}>Back</Button>
        <Button colorScheme="red" onClick={handleSave}>Next</Button>
      </Flex>

    </Box>
  )
}
export default PersonalInformation
