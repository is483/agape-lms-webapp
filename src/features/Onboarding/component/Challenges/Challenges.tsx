import React, { ChangeEvent, useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Select, Text } from '@chakra-ui/react'
import getAuth from '../../../../app/redux/selectors'
import { useAppSelector } from '../../../../hooks'
import { ControlledSelect, Icon } from '../../../../components'

interface Props {
  handleBack: () => void
  handleNext: () => void
}

interface Errors {
  challenges: string
}

const defaultErrors: Errors = {
  challenges: 'No interests selected'
}


const mentorChallengesOptions = ['Balancing work life commitments', 'Imposter syndrome', 'Time management', 'Task delegation']
const menteeChallengesOptions = ['Career transition', 'Confidence building', 'Overcoming procrastination']

function Challenges(props: Props) {
  const { handleBack, handleNext } = props
  const { role } = useAppSelector(getAuth)
  const challengesOptions = role === 'Mentor' ? mentorChallengesOptions : menteeChallengesOptions
  const [challenges, setChallenges] = useState<string[]>([''])
  const [errors, setErrors] = useState<Errors>(defaultErrors)

  const handleChallengeChange = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    setChallenges((prevChallenges) => {
      const newChallenges = [...prevChallenges]
      newChallenges[index] = e.target.value
      return newChallenges
    })
  }

  const handleAddChallenge = () => {
    setChallenges((prevChallenges) => [
      ...prevChallenges, '',
    ])
  }

  const handleDeleteChallenge = (index: number) => {
    if (challenges.length <= 1) return
    setChallenges((prevChallenges) => {
      const newChallenges = [...prevChallenges]
      newChallenges.splice(index, 1)
      return newChallenges
    })
  }

  const handleSave = () => {
    // TODO: include api call to save changes
    handleNext()
  }
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="600"> Challenges/Lessons</Text>
      <Text color="secondary.500" marginTop="1" marginBottom="8"> Reflect on obstacles overcome and wisdom gained</Text>
      <FormLabel>Challenges/Lessons (Select up to 5 options)</FormLabel>
      {
        challenges.map((challenge, index) => (
          <Flex alignItems="center" marginBottom="5" gap={4}>
            <ControlledSelect selectProps={{ onChange: (e) => handleChallengeChange(e, index), value: challenge }} error={errors.challenges} placeholder={''} options={challengesOptions}/>
            <Icon name="delete" _hover={{ cursor: 'pointer' }} color={challenges.length <= 1 ? 'secondary.200' : 'secondary.500'} onClick={() => handleDeleteChallenge(index)} />
          </Flex>
        ))
      }
      {challenges.length < 5 && (
        <Box marginY="10">
          <Button size="sm" onClick={handleAddChallenge}> + Add Challenge</Button>
        </Box>
      )}
      <Flex justifyContent="end" gap="4">
        <Button onClick={handleBack}>Back</Button>
        <Button colorScheme="red" onClick={handleSave}>Next</Button>
      </Flex>
    </Box>
  )
}
export default Challenges