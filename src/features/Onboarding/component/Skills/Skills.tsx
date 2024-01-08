import {
  Box, Button, Flex, FormControl, Select, Text,
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import getAuth from '../../../../app/redux/selectors'
import { useAppSelector } from '../../../../hooks'
import { Icon } from '../../../../components'

interface Props {
  handleBack: () => void
  handleNext: () => void
}
function Skills(props: Props) {
  const { handleBack, handleNext } = props
  const { role } = useAppSelector(getAuth)
  const skillOptions = ['Effective Communication', 'Teamwork', 'Negotiation', 'Emotional Intelligence']
  const [skills, setSkills] = useState<string[]>([''])
  const handleSave = () => {
    // TODO: include api call to save changes
    handleNext()
  }
  const handleSkillsChange = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    setSkills((prevSkills) => {
      const newSkills = [...prevSkills]
      newSkills[index] = e.target.value
      return newSkills
    })
  }
  const handleAddSkills = () => {
    setSkills((prevSkills) => [
      ...prevSkills, '',
    ])
  }
  const handleDeleteSkill = (index: number) => {
    if (skills.length <= 1) return
    setSkills((prevSkills) => {
      const newSkills = [...prevSkills]
      newSkills.splice(index, 1)
      return newSkills
    })
  }
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="600"> Skills and Knowledge </Text>
      <Text color="secondary.500" marginTop="1" marginBottom="8">
        {role === 'Mentor' ? 'Share with us what you are good at!' : 'Highlight what are some skills you\'d like to learn'}
      </Text>
      <Text marginBottom="3">
        {role === 'Mentor' ? 'Skills (Select up to 5 options)' : 'Skills you\'d like to acquire (Select up to 5 options)'}
      </Text>
      {skills.map((skill, index) => (
        <Flex alignItems="center" marginBottom="5" gap={4}>
          <FormControl isRequired>
            <Select placeholder="Select option" onChange={(e) => handleSkillsChange(e, index)} value={skill}>
              {skillOptions.map((skillOption) => (
                <option value={skillOption}>{skillOption}</option>
              ))}
            </Select>
          </FormControl>
          <Icon name="delete" _hover={{ cursor: 'pointer' }} color={skills.length <= 1 ? 'secondary.200' : 'secondary.500'} onClick={() => handleDeleteSkill(index)} />
        </Flex>
      ))}
      {skills.length < 5 && (
        <Box marginY="5">
          <Button size="sm" onClick={handleAddSkills}> + Add Skills</Button>
        </Box>
      )}

      <Flex justifyContent="end" gap="4">
        <Button onClick={handleBack}>Back</Button>
        <Button colorScheme="red" onClick={handleSave}>Next</Button>
      </Flex>
    </Box>
  )
}

export default Skills
