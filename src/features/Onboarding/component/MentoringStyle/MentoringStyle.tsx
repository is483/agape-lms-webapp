import { Box, Button, Checkbox, CheckboxGroup, Flex, FormControl, FormLabel, Select, SimpleGrid, Text, Textarea } from "@chakra-ui/react"
import getAuth from "../../../../app/redux/selectors"
import { useAppSelector } from "../../../../hooks"
import { ChangeEvent, useState } from "react"
import { ControlledSelect, ControlledTextInput, Icon } from "../../../../components"


interface Props {
  handleBack: () => void
  handleNext: () => void
}

interface Errors {
  preferredCommunication: string
  meetingDays: string
  mentoringApproaches: string
  expectations: string
}

const defaultErrors: Errors = {
  preferredCommunication: 'Test Error',
  meetingDays: 'Test Error',
  mentoringApproaches: 'Test Error',
  expectations: 'Test Error'
}

const mentoringOptions = ['Coaching Oriented', 'Directive', 'Supportive', 'Facilitative', 'Collaborative']
const communicationOptions = ['Physical', 'Online']
const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function MentoringStyle(props: Props) {
  const { handleBack, handleNext } = props
  const { role } = useAppSelector(getAuth)
  const [preferredCommunication, setPreferredCommunication] = useState('')
  const [meetingDays, setMeetingDays] = useState<string[]>([''])
  const [mentoringApproaches, setMentoringApproaches] = useState<string[]>([''])
  const [expectations, setExpectations] = useState('')
  const [errors, setErrors] = useState<Errors>(defaultErrors)

  const handlePreferredCommunicationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newPreferredCommunication = e.target.value
    setPreferredCommunication(newPreferredCommunication)
  }

  const handleCheckboxChange = (meetingDays: string[]) => {
    setMeetingDays(meetingDays);
  };
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
      ...prevMentoringApproach, ''
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
  const handleSave = () => {
    // TODO: include api call to save changes
    handleNext()
  }

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="600"> Mentoring Style </Text>
      <Text color="secondary.500" marginTop="1" marginBottom="55">{role === 'Mentor' ? 'Define your approach to guidance and support' : 'Outline your learning preferences and expectations'} </Text>
      <Box marginBottom="8">
        <ControlledSelect label="Preferred Communication" error={errors.preferredCommunication} placeholder={""} options={communicationOptions} selectProps={{ onChange: handlePreferredCommunicationChange, value: preferredCommunication }} />
      </Box>
      <Box marginBottom="8">
        <CheckboxGroup onChange={handleCheckboxChange} value={meetingDays}>
          <FormLabel> Meeting Days </FormLabel>
          <SimpleGrid columns={[1, null, 3]} marginBottom="2" spacingY={5}>
            {dayOptions.map((day,index)=>(
              <Checkbox value={day}> {day} </Checkbox>
            ))}
          </SimpleGrid>
          {!!errors.meetingDays && <Text position="absolute" fontSize="xs" color="red.600" >{errors.meetingDays}</Text>}
        </CheckboxGroup>
      </Box>

      {role === 'Mentee' && (
        <Box marginY="10">
          <FormControl>
            <FormLabel fontWeight="600">Expectations</FormLabel>
            <Textarea borderColor={errors.expectations ? 'red.600' : 'inherit'} borderWidth={errors.expectations ? '2px' : '1px'} placeholder="Describe what you kind of support you'd like from your mentor..." value={expectations} onChange={handleExpectationsChange}>
            </Textarea>
            {!!errors.expectations && <Text position="absolute" fontSize="xs" color="red.600" >{errors.meetingDays}</Text>}
          </FormControl>

        </Box>
      )}
      {role === 'Mentor' && (
        <Box>
          <FormLabel>Preferred Mentoring Approach (Select up to 3 options)</FormLabel>
          {mentoringApproaches.map((mentoringApproach, index) => (
            <Flex marginBottom="5" gap={4} alignItems="center">
              <ControlledSelect selectProps={{ onChange: (e) => handleMentoringApproachesChange(e, index), value: mentoringApproach }} options={mentoringOptions} error={errors.mentoringApproaches} placeholder={""} />
              <Icon name="delete" _hover={{ cursor: 'pointer' }} color={mentoringApproaches.length <= 1 ? 'secondary.200' : 'secondary.500'} onClick={() => handleDeleteMentoringApproach(index)} />
            </Flex>
          ))}
          {mentoringApproaches.length < 3 && (
            <Box marginY="10">
              <Button size="sm" onClick={handleAddMentoringApproach}> + Add Mentoring Approach</Button>
            </Box>
          )}
        </Box>
      )}
      <Flex justifyContent="end" gap="4">
        <Button onClick={handleBack}>Back</Button>
        <Button colorScheme="red" onClick={handleSave}>Next</Button>
      </Flex>
    </Box>
  )
}
export default MentoringStyle
