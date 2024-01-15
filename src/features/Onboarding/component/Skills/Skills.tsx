import {
  Box, Button, Flex, Text,
} from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import getAuth from '../../../../app/redux/selectors'
import { useAppSelector } from '../../../../hooks'
import { ControlledSelect, Icon } from '../../../../components'
import { useUpdateMentorSkillsMutation, useUpdateMenteeSkillsMutation } from '../../../../app/services/user/apiUserSlice'
import { SkillsRequest } from '../../../../app/services/user/types'
import { deepCopy } from '../../../../utils'

interface Props {
  handleBack: () => void
  handleNext: () => void
  data: any
}

interface Errors {
  skills: string[]
}

const defaultErrors: Errors = {
  skills: [],
}

const skillOptions = ['Effective Communication', 'Teamwork', 'Negotiation', 'Emotional Intelligence']

function Skills(props: Props) {
  const { handleBack, handleNext, data } = props
  const [updateMentorSkills, { isLoading: isMentorInfoLoading }] = useUpdateMentorSkillsMutation()
  const [updateMenteeSkills, { isLoading: isMenteeInfoLoading }] = useUpdateMenteeSkillsMutation()
  const { role } = useAppSelector(getAuth)
  const [skills, setSkills] = useState<string[]>([''])
  const [errors, setErrors] = useState<Errors>(defaultErrors)

  useEffect(() => {
    setSkills(data.skills ?? [''])
  }, [data])

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
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors }
      newErrors.skills = [...prevErrors.skills, '']
      return newErrors
    })
  }
  const handleDeleteSkill = (index: number) => {
    if (skills.length <= 1) return
    setSkills((prevSkills) => {
      const newSkills = [...prevSkills]
      newSkills.splice(index, 1)
      return newSkills
    })
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors }
      newErrors.skills.splice(index, 1)
      return newErrors
    })
  }

  const handleSave = async () => {
    const newErrors = deepCopy(defaultErrors)
    let hasErrors = false
    skills.forEach((skill, index) => {
      if (!skill) {
        newErrors.skills[index] = 'Skill required'
        hasErrors = true
      }
    })
    if (hasErrors) {
      setErrors(newErrors)
      return
    }
    const updateSkills = role === 'Mentor' ? updateMentorSkills : updateMenteeSkills
    const skillsRequest: SkillsRequest = {
      skills,
    }
    try {
      await updateSkills(skillsRequest).unwrap()
      handleNext()
    } catch (e) {
      console.error(e)
    }
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
          <ControlledSelect
            error={errors.skills[index]}
            options={skillOptions}
            selectProps={{ onChange: (e) => handleSkillsChange(e, index), value: skill }}
          />
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
        <Button colorScheme="red" onClick={handleSave} isLoading={role === 'Mentor' ? isMentorInfoLoading : isMenteeInfoLoading}>Next</Button>
      </Flex>
    </Box>
  )
}

export default Skills
