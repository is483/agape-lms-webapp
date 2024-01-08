import { Box, Button, Checkbox, CheckboxGroup, Flex, FormControl, FormLabel, Select, SimpleGrid, Text, Textarea } from "@chakra-ui/react"
import getAuth from "../../../../app/redux/selectors"
import { useAppSelector } from "../../../../hooks"
import { ChangeEvent, useState } from "react"
import { Icon } from "../../../../components"


interface Props {
  handleBack: () => void
  handleNext: () => void
}

function MentoringStyle(props: Props) {
  const { handleBack, handleNext } = props
  const { role } = useAppSelector(getAuth)
  const [meetingDays, setMeetingDays] = useState<string[]>([''])
  const [mentoringApproaches, setMentoringApproaches] = useState<string[]>([''])
  const [expectations, setExpectations] = useState('')
  const mentoringOptions = ['Coaching Oriented', 'Directive', 'Supportive', 'Facilitative', 'Collaborative']

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
      ...prevMentoringApproach,''
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

  console.log(expectations)
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="600"> Mentoring Style </Text>
      <Text color="secondary.500" marginTop="1" marginBottom="8">{role === 'Mentor' ? 'Define your approach to guidance and support' : 'Outline your learning preferences and expectations'} </Text>
      <Box marginBottom="8">
        <FormControl isRequired>
          <FormLabel fontWeight="600">Preferred Communication</FormLabel>
          <Select placeholder="Select option">
            <option value="physical"> Physical </option>
            <option value="online"> Online </option>
          </Select>
        </FormControl>
      </Box>
      <Box marginBottom="8">
        <FormControl isRequired>
          <FormLabel fontWeight="600">Preferred Days of Meeting</FormLabel>
          <CheckboxGroup onChange={handleCheckboxChange} value={meetingDays}>
            <SimpleGrid columns={[1, null, 3]} spacingY={5}>
              <Checkbox value="Monday">Monday</Checkbox>
              <Checkbox value="Tuesday">Tuesday</Checkbox>
              <Checkbox value="Wednesday">Wednesday</Checkbox>
              <Checkbox value="Thursday">Thursday</Checkbox>
              <Checkbox value="Friday">Friday</Checkbox>
              <Checkbox value="Saturday">Saturday</Checkbox>
              <Checkbox value="Sunday">Sunday</Checkbox>
            </SimpleGrid>
          </CheckboxGroup>
        </FormControl>
      </Box>

      {role === 'Mentee' && (
        <Box>
          <FormControl isRequired>
            <FormLabel fontWeight="600">Expectations</FormLabel>
            <Textarea placeholder="Describe what you kind of support you'd like from your mentor..." value={expectations} onChange={handleExpectationsChange}>

            </Textarea>
          </FormControl>

        </Box>
      )}
      {role === 'Mentor' && (
        <Box>
          <FormLabel fontWeight="600">Preferred Mentoring Approach (Select up to 3 options)</FormLabel>
          {mentoringApproaches.map((mentoringApproach, index) => (
            <Flex marginBottom="5" gap={4} alignItems="center">
              <FormControl isRequired>
                <Select placeholder="Select option" onChange={(e) => handleMentoringApproachesChange(e, index)} value={mentoringApproach}>
                  {mentoringOptions.map((mentoringOption) => (
                    <option value={mentoringOption}>{mentoringOption}</option>
                  ))}
                </Select>
              </FormControl>
              <Icon name="delete" _hover={{ cursor: 'pointer' }} color={mentoringApproaches.length <= 1 ? 'secondary.200' : 'secondary.500'} onClick={() => handleDeleteMentoringApproach(index)} />
            </Flex>
          ))}
          {mentoringApproaches.length < 3 && (
            <Box marginY="5">
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
