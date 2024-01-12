import {
  Box, Button, Flex, FormControl, FormLabel, Select, Text,
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { Icon } from '../../../../components'

interface Props {
  handleBack: () => void
  handleNext: () => void
}

const interestOptions = ['Volleyball', 'Basketball', 'Soccer', 'Running', 'Outdoor Activities']

function Interests(props: Props) {
  const { handleBack, handleNext } = props
  const [interests, setInterests] = useState<string[]>([''])
  
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
  }

  const handleDeleteInterest = (index: number) => {
    if (interests.length <= 1) return
    setInterests((prevInterests) => {
      const newInterests = [...prevInterests]
      newInterests.splice(index, 1)
      return newInterests
    })
  }
  const handleSave = () => {
    // TODO: include api call to save changes
    handleNext()
  }
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="600"> Interests</Text>
      <Text color="secondary.500" marginTop="1" marginBottom="8"> Highlight your passions and hobbies</Text>
      <FormLabel>Interests and Hobbies (Select up to 5 options)</FormLabel>
      {
        interests.map((interest, index) => (
          <Flex alignItems="center" marginBottom="5" gap={4}>
            <FormControl>
              <Select placeholder="Select option" onChange={(e) => handleInterestChange(e, index)} value={interest}>
                {interestOptions.map((interestOption) => (
                  <option value={interestOption}>{interestOption}</option>
                ))}
              </Select>
            </FormControl>
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
        <Button colorScheme="red" onClick={handleSave}>Finish</Button>
      </Flex>
    </Box>

  )
}

export default Interests
