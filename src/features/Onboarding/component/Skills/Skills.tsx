import {
  Box, Button, Flex, FormControl, Select, Text,
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import getAuth from '../../../../app/redux/selectors'
import { useAppSelector } from '../../../../hooks'
import { ControlledSelect, Icon } from '../../../../components'

interface Props {
  handleBack: () => void
  handleNext: () => void
}

interface Errors {
  skills: string
}

const defaultErrors: Errors = {
  skills: 'No skill selected'
}

const skillOptions = ['Effective Communication', 'Teamwork', 'Negotiation', 'Emotional Intelligence']

function Skills(props: Props) {
  const { handleBack, handleNext } = props
  const { role } = useAppSelector(getAuth)
  const [skills, setSkills] = useState<string[]>([''])
  const [errors, setErrors] = useState<Errors>(defaultErrors)

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

  const handleSave = () => {
    // TODO: include api call to save changes
    handleNext()
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
          <ControlledSelect error={errors.skills} placeholder={''} label=""  options={skillOptions} selectProps={{ onChange: (e)=> handleSkillsChange(e,index), value: skill}} />
          <Icon name="delete" _hover={{ cursor: 'pointer' }} color={skills.length <= 1 ? 'secondary.200' : 'secondary.500'} onClick={() => handleDeleteSkill(index)} />
        </Flex>
      ))}
      {skills.length < 5 && (
        <Box marginY="10">
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
