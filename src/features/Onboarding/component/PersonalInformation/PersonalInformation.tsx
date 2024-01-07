import {
  Box, Text, FormControl, Input, FormLabel, SimpleGrid,
  Select, NumberInputField, NumberInput, Flex, Circle, Button,
} from '@chakra-ui/react'
import React, { ChangeEvent, useState } from 'react'
import { Icon } from '../../../../components'

interface Props {
  handleBack: () => void
  handleNext: () => void
}

function PersonalInformation(props: Props) {
  const { handleBack, handleNext } = props
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const firstName = e.target.value
    setFirstName(firstName)
  }

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lastName = e.target.value
    setLastName(lastName)
  }

  const handleDateOfBirth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateOfBirth = e.target.value
    setDateOfBirth(dateOfBirth)
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
      <SimpleGrid columns={[1, null, 2]} spacing="4" spacingY="4">
        <Box>
          <FormControl isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              placeholder="First name"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              placeholder="Last name"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl isRequired>
            <FormLabel>Date of Birth</FormLabel>
            <Input
              placeholder="Select "
              size="md"
              type="date"
              value={dateOfBirth}
              onChange={handleDateOfBirth}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl isRequired>
            <FormLabel>Gender</FormLabel>
            <Select placeholder="Select gender">
              <option value="male"> Male </option>
              <option value="female"> Female </option>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl isRequired>
            <FormLabel>Phone Number</FormLabel>
            <NumberInput>
              <NumberInputField />
            </NumberInput>
          </FormControl>
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
