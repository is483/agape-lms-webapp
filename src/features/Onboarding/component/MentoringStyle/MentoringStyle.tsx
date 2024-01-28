import {
  Box, Button, Checkbox, CheckboxGroup, Flex,
  FlexProps,
  FormControl, FormLabel, SimpleGrid, Text, Textarea, useToast,
} from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { getAuth } from '../../../../app/redux/selectors'
import { useAppSelector } from '../../../../hooks'
import { ControlledSelect, Icon } from '../../../../components'
import { useUpdateMenteeMentoringStyleMutation, useUpdateMentorMentoringStyleMutation } from '../../../../app/services/user/apiUserSlice'
import { MenteeMentoringRequest, MentorMentoringRequest, TransformedUserResponse } from '../../../../app/services/user/types'
import { Role } from '../../../../app/types'
import { deepCopy } from '../../../../utils'

interface Props extends FlexProps {
  handleBack?: () => void
  handleNext?: () => void
  data: TransformedUserResponse | undefined
}

interface MentorErrors {
  type: Role
  preferredCommunication: string
  meetingDays: string
  mentoringApproaches: string[]
}

interface MenteeErrors {
  type: Role
  preferredCommunication: string
  meetingDays: string
  expectations: string
}

const instanceOfMentorError = (object: any): object is MentorErrors => object.type === 'Mentor'

const instanceOfMenteeError = (object: any): object is MenteeErrors => object.type === 'Mentee'

type Errors = MentorErrors | MenteeErrors;

const mentorDefaultErrors: MentorErrors = {
  type: 'Mentor',
  preferredCommunication: '',
  meetingDays: '',
  mentoringApproaches: [],
}

const menteeDefaultErrors: MenteeErrors = {
  type: 'Mentee',
  preferredCommunication: '',
  meetingDays: '',
  expectations: '',
}

const mentoringOptions = ['Coaching Oriented', 'Directive', 'Supportive', 'Facilitative', 'Collaborative']
const communicationOptions = ['Physical', 'Online']
const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function MentoringStyle(props: Props) {
  const {
    handleBack, handleNext, data, ...rest
  } = props
  const [updateMentorMentoringStyle, { isLoading: isMentorInfoLoading }] = useUpdateMentorMentoringStyleMutation()
  const [updateMenteeMentoringStyle, { isLoading: isMenteeInfoLoading }] = useUpdateMenteeMentoringStyleMutation()
  const { role } = useAppSelector(getAuth)
  const toast = useToast()
  const [preferredCommunication, setPreferredCommunication] = useState('')
  const [meetingDays, setMeetingDays] = useState<string[]>([])
  const [mentoringApproaches, setMentoringApproaches] = useState<string[]>([''])
  const [expectations, setExpectations] = useState('')
  const [errors, setErrors] = useState<Errors>(mentorDefaultErrors)

  useEffect(() => {
    if (!data) return
    if (role === 'Mentor') {
      setErrors(mentorDefaultErrors)
    } else {
      setErrors(menteeDefaultErrors)
    }
    setPreferredCommunication(data.preferredCommunication)
    setMeetingDays(data.preferredMeetingDays)
    setMentoringApproaches(data.preferredMentoringApproach)
    setExpectations(data.expectations)
  }, [role, data])

  const handlePreferredCommunicationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newPreferredCommunication = e.target.value
    setPreferredCommunication(newPreferredCommunication)
  }

  const handleCheckboxChange = (meetingDays: string[]) => {
    setMeetingDays(meetingDays)
  }
  const handleExpectationsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newExpectations = e.target.value
    setExpectations(newExpectations)
  }

  const handleMentoringApproachesChange = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    setMentoringApproaches((prevMentoringApproaches) => {
      const newMentoringApproaches = [...prevMentoringApproaches]
      newMentoringApproaches[index] = e.target.value
      return newMentoringApproaches
    })
  }

  const handleAddMentoringApproach = () => {
    setMentoringApproaches((prevMentoringApproach) => [
      ...prevMentoringApproach, '',
    ])
  }
  const handleDeleteMentoringApproach = (index: number) => {
    if (mentoringApproaches.length <= 1) return
    setMentoringApproaches((prevMentoringApproach) => {
      const newMentoringApproaches = [...prevMentoringApproach]
      newMentoringApproaches.splice(index, 1)
      return newMentoringApproaches
    })
  }
  const handleSave = async () => {
    const newErrors = role === 'Mentor' ? deepCopy(mentorDefaultErrors) : deepCopy(menteeDefaultErrors)
    let hasErrors = false
    if (!preferredCommunication) {
      newErrors.preferredCommunication = 'Preferred Communication method required'
      hasErrors = true
    }

    if (meetingDays.length === 0) {
      newErrors.meetingDays = 'Preferred Meeting Days required'
      hasErrors = true
    }

    if (role === 'Mentor') {
      mentoringApproaches.forEach((mentoringApproach, index) => {
        if (!mentoringApproach) {
          (newErrors as MentorErrors).mentoringApproaches[index] = 'Mentoring approach required'
          hasErrors = true
        }
      })
    } else
      if (!expectations) {
        (newErrors as MenteeErrors).expectations = 'Expectations required'
        hasErrors = true
      }

    if (hasErrors) {
      setErrors(newErrors)
      return
    }
    try {
      const mentorMentoringRequest: MentorMentoringRequest = {
        preferredCommunication,
        preferredMeetingDays: meetingDays,
        preferredMentoringApproach: mentoringApproaches,
      }
      const menteeMentoringRequest: MenteeMentoringRequest = {
        preferredCommunication,
        preferredMeetingDays: meetingDays,
        expectations,
      }
      if (role === 'Mentor') {
        await updateMentorMentoringStyle(mentorMentoringRequest).unwrap()
      } else {
        await updateMenteeMentoringStyle(menteeMentoringRequest).unwrap()
      }
      if (!handleNext) {
        toast({
          title: 'Mentoring Style',
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
        <Text fontSize="2xl" fontWeight="600"> Mentoring Style </Text>
        <Text color="secondary.500" marginTop="1" marginBottom="55">{role === 'Mentor' ? 'Define your approach to guidance and support' : 'Outline your learning preferences and expectations'} </Text>
        <Box marginBottom="8">
          <ControlledSelect label="Preferred Communication" error={errors?.preferredCommunication} options={communicationOptions} selectProps={{ onChange: handlePreferredCommunicationChange, value: preferredCommunication }} />
        </Box>
        <Box marginBottom="8">
          <CheckboxGroup onChange={handleCheckboxChange} value={meetingDays}>
            <FormLabel> Meeting Days </FormLabel>
            <SimpleGrid columns={[1, null, 3]} marginBottom="2" spacingY={5}>
              {dayOptions.map((day) => (
                <Checkbox value={day}> {day} </Checkbox>
              ))}
            </SimpleGrid>
            {!!errors?.meetingDays && <Text position="absolute" fontSize="xs" color="red.600">{errors?.meetingDays}</Text>}
          </CheckboxGroup>
        </Box>

        {role === 'Mentee' && instanceOfMenteeError(errors) && (
          <Box marginY="10">
            <FormControl>
              <FormLabel fontWeight="600">Expectations</FormLabel>
              <Textarea borderColor={errors?.expectations ? 'red.600' : 'inherit'} borderWidth={errors?.expectations ? '2px' : '1px'} placeholder="Describe what you kind of support you'd like from your mentor..." value={expectations} onChange={handleExpectationsChange} />
              {!!errors?.expectations && <Text position="absolute" fontSize="xs" color="red.600">{errors?.expectations}</Text>}
            </FormControl>
          </Box>
        )}
        {role === 'Mentor' && instanceOfMentorError(errors) && (
          <Box>
            <FormLabel>Preferred Mentoring Approach (Select up to 3 options)</FormLabel>
            {mentoringApproaches?.map((mentoringApproach, index) => (
              <Flex marginBottom="5" gap={4} alignItems="center">
                <ControlledSelect
                  selectProps={{
                    onChange: (e) => handleMentoringApproachesChange(e, index),
                    value: mentoringApproach,
                  }}
                  options={
                    mentoringOptions.filter((option) => mentoringApproach === option || !mentoringApproaches.includes(option))
                  }
                  error={errors?.mentoringApproaches[index]}
                />
                <Icon name="delete" _hover={{ cursor: 'pointer' }} color={mentoringApproaches.length <= 1 ? 'secondary.200' : 'secondary.500'} onClick={() => handleDeleteMentoringApproach(index)} />
              </Flex>
            ))}
            {mentoringApproaches.length < 3 && (
              <Box marginBottom="10">
                <Button size="sm" onClick={handleAddMentoringApproach}> + Add Mentoring Approach</Button>
              </Box>
            )}
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

MentoringStyle.defaultProps = {
  handleBack: undefined,
  handleNext: undefined,
}
export default MentoringStyle
