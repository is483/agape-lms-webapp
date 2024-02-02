import { ChangeEvent, useEffect, useState } from 'react'
import {
  Box, Button, Flex, FlexProps, FormLabel, Text, useToast,
} from '@chakra-ui/react'
import { getAuth } from '../../../../app/redux/selectors'
import { useAppSelector } from '../../../../hooks'
import { ControlledSelect, Icon } from '../../../../components'
import { useUpdateMenteeChallengesMutation, useUpdateMentorChallengesMutation } from '../../../../app/services/user/apiUserSlice'
import { ChallengesRequest, TransformedUserResponse } from '../../../../app/services/user/types'
import { deepCopy } from '../../../../utils'

interface Props extends FlexProps {
  handleBack?: () => void
  handleNext?: () => void
  data: TransformedUserResponse | undefined
}

interface Errors {
  challenges: string[]
}

const defaultErrors: Errors = {
  challenges: [],
}

const mentorChallengesOptions = ['Balancing work', 'Imposter syndrome', 'Time management', 'Task delegation']
const menteeChallengesOptions = ['Career transition', 'Confidence building', 'Overcoming procrastination']

function Challenges(props: Props) {
  const {
    handleBack, handleNext, data, ...rest
  } = props
  const [updateMentorChallenges, { isLoading: isMentorInfoLoading }] = useUpdateMentorChallengesMutation()
  const [updateMenteeChallenges, { isLoading: isMenteeInfoLoading }] = useUpdateMenteeChallengesMutation()
  const { role } = useAppSelector(getAuth)
  const challengesOptions = role === 'Mentor' ? mentorChallengesOptions : menteeChallengesOptions
  const [challenges, setChallenges] = useState<string[]>([''])
  const toast = useToast()
  const [errors, setErrors] = useState<Errors>(defaultErrors)

  useEffect(() => {
    if (!data) return
    setChallenges(data.challenges)
  }, [data])

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
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors }
      newErrors.challenges = [...prevErrors.challenges, '']
      return newErrors
    })
  }

  const handleDeleteChallenge = (index: number) => {
    if (challenges.length <= 1) return
    setChallenges((prevChallenges) => {
      const newChallenges = [...prevChallenges]
      newChallenges.splice(index, 1)
      return newChallenges
    })
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors }
      newErrors.challenges.splice(index, 1)
      return newErrors
    })
  }

  const handleSave = async () => {
    const newErrors = deepCopy(defaultErrors)
    let hasErrors = false
    challenges.forEach((challenge, index) => {
      if (!challenge) {
        newErrors.challenges[index] = 'Challenge required'
        hasErrors = true
      }
    })
    setErrors(newErrors)
    if (hasErrors) {
      return
    }
    const updateChallenges = role === 'Mentor' ? updateMentorChallenges : updateMenteeChallenges
    const challengeRequests: ChallengesRequest = {
      challenges,
    }
    try {
      await updateChallenges(challengeRequests).unwrap()
      if (!handleNext) {
        toast({
          title: 'Challenges/Lessons',
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
        <Text fontSize="2xl" fontWeight="600"> Challenges/Lessons</Text>
        <Text color="secondary.500" marginTop="1" marginBottom="8"> Reflect on obstacles overcome and wisdom gained</Text>
        <FormLabel>Challenges/Lessons (Select up to 5 options)</FormLabel>
        {
          challenges.map((challenge, index) => (
            <Flex alignItems="center" marginBottom="5" gap={4}>
              <ControlledSelect
                selectProps={{ onChange: (e) => handleChallengeChange(e, index), value: challenge }}
                error={errors.challenges[index]}
                options={
                  challengesOptions.filter((option) => challenge === option || !challenges.includes(option))
                }
              />
              <Icon name="delete" _hover={{ cursor: 'pointer' }} color={challenges.length <= 1 ? 'secondary.200' : 'secondary.500'} onClick={() => handleDeleteChallenge(index)} />
            </Flex>
          ))
        }
        {challenges.length < 5 && (
          <Box marginBottom="10">
            <Button size="sm" onClick={handleAddChallenge}> + Add Challenge</Button>
          </Box>
        )}
      </Box>
      <Flex justifyContent="end" gap="4" my="8">
        {handleBack && <Button onClick={handleBack}>Back</Button>}
        <Button colorScheme="red" onClick={handleSave} isLoading={role === 'Mentor' ? isMentorInfoLoading : isMenteeInfoLoading}>{handleNext ? 'Next' : 'Save'}</Button>
      </Flex>
    </Flex>
  )
}

Challenges.defaultProps = {
  handleBack: undefined,
  handleNext: undefined,
}
export default Challenges
