import {
  Box, Button, Flex, FormLabel, Text,
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { ControlledSelect, Icon } from '../../../../components'
import { useUpdateMenteeInterestsMutation, useUpdateMentorInterestsMutation } from '../../../../app/services/user/apiUserSlice'
import { useAppSelector } from '../../../../hooks'
import getAuth from '../../../../app/redux/selectors'
import { InterestsRequest } from '../../../../app/services/user/types'
import { deepCopy } from '../../../../utils'

interface Props {
  handleBack: () => void
  handleNext: () => void
}

interface Errors {
  interests: string[]
}

const defaultErrors: Errors = {
  interests: [],
}

const interestOptions = ['Volleyball', 'Basketball', 'Soccer', 'Running', 'Outdoor Activities']

function Interests(props: Props) {
  const { handleBack, handleNext } = props
  const [updateMentorInterests,
    { isLoading: isMentorInfoLoading }] = useUpdateMentorInterestsMutation()
  const [updateMenteeInterests,
    { isLoading: isMenteeInfoLoading }] = useUpdateMenteeInterestsMutation()
  const [interests, setInterests] = useState<string[]>([''])
  const [errors, setErrors] = useState<Errors>(defaultErrors)
  const { role } = useAppSelector(getAuth)

  const handleInterestChange = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    setInterests((prevInterests) => {
      const newInterests = [...prevInterests]
      newInterests[index] = e.target.value
      return newInterests
    })
  }
  const handleAddInterests = () => {
    setInterests((prevInterests) => [
      ...prevInterests, '',
    ])
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors }
      newErrors.interests = [...prevErrors.interests, '']
      return newErrors
    })
  }

  const handleDeleteInterest = (index: number) => {
    if (interests.length <= 1) return
    setInterests((prevInterests) => {
      const newInterests = [...prevInterests]
      newInterests.splice(index, 1)
      return newInterests
    })
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors }
      newErrors.interests.splice(index, 1)
      return newErrors
    })
  }
  const handleSave = async () => {
    const newErrors = deepCopy(defaultErrors)
    let hasErrors = false
    interests.forEach((interest, index) => {
      if (!interest) {
        newErrors.interests[index] = 'Interest required'
        hasErrors = true
      }
    })
    if (hasErrors) {
      setErrors(newErrors)
      return
    }
    const updateInterests = role === 'Mentor' ? updateMentorInterests : updateMenteeInterests
    const interestRequests: InterestsRequest = {
      interests,
    }
    try {
      await updateInterests(interestRequests).unwrap()
      handleNext()
    } catch (e) {
      console.error(e)
    } handleNext()
  }
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="600"> Interests</Text>
      <Text color="secondary.500" marginTop="1" marginBottom="8"> Highlight your passions and hobbies</Text>
      <FormLabel>Interests and Hobbies (Select up to 5 options)</FormLabel>
      {
        interests.map((interest, index) => (
          <Flex alignItems="center" marginBottom="5" gap={4}>
            <ControlledSelect selectProps={{ onChange: (e) => handleInterestChange(e, index), value: interest }} error={errors.interests[index]} options={interestOptions} placeholder="" />
            <Icon name="delete" _hover={{ cursor: 'pointer' }} color={interests.length <= 1 ? 'secondary.200' : 'secondary.500'} onClick={() => handleDeleteInterest(index)} />
          </Flex>
        ))
      }
      {interests.length < 5 && (
        <Box marginY="5">
          <Button size="sm" onClick={handleAddInterests}> + Add Interest</Button>
        </Box>
      )}
      <Flex justifyContent="end" gap="4">
        <Button onClick={handleBack}>Back</Button>
        <Button colorScheme="red" onClick={handleSave} isLoading={role === 'Mentor' ? isMentorInfoLoading : isMenteeInfoLoading}>Finish</Button>
      </Flex>
    </Box>

  )
}

export default Interests
