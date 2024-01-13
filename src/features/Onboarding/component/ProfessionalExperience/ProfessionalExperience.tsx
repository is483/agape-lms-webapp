import {
  Box, Button, Flex, FormControl,
  FormLabel, Input, SimpleGrid, Text, Textarea,
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { ControlledSelect, ControlledTextInput, Icon } from '../../../../components'
import getAuth from '../../../../app/redux/selectors'
import { useAppSelector } from '../../../../hooks'
import useBreakpoint from '../../../../hooks/useBreakpoint'

interface Props {
  handleBack: () => void
  handleNext: () => void
}

interface WorkExperience {
  jobTitle: string
  company: string
  description: string
}

const defaultWorkExperience: WorkExperience = {
  jobTitle: '',
  company: '',
  description: '',
}

interface Errors {
  careerAspiration: string
  jobTitle: string
  company: string
  description: string
}

const defaultErrors: Errors = {
  careerAspiration: 'No career aspiration selected',
  jobTitle: 'No job title included',
  company: 'No company included',
  description: 'No description included'
}

const careerOptions = ['IT Technician', 'Video Producer', 'Content Creator']


const defaultWorkExperiences: WorkExperience[] = [{ ...defaultWorkExperience }]

function ProfessionalExperience(props: Props) {
  const { handleBack, handleNext } = props
  const [workExperiences, setWorkExperiences] = useState(defaultWorkExperiences)
  const [careerAspiration, setCareerAspiration] = useState('')
  const { role } = useAppSelector(getAuth)
  const [errors, setErrors] = useState<Errors>(defaultErrors)
  const isMdUp = useBreakpoint('md')


  const handleCareerAspirationsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCareerAspiration(e.target.value)
  }
  const handleAddWorkExperience = () => {
    setWorkExperiences((prevWorkExperiences) => [
      ...prevWorkExperiences, { ...defaultWorkExperience },
    ])
  }

  const handleWorkExperienceChange = (
    e: ChangeEvent<HTMLInputElement>| ChangeEvent<HTMLTextAreaElement>, index: number, key: keyof WorkExperience) => {
    const { value } = e.target
    setWorkExperiences((prevWorkExperiences) => {
      const newWorkExperiences = [...prevWorkExperiences]
      newWorkExperiences[index][key] = value
      return newWorkExperiences
    })
  }

  const handleDeleteWorkExperience = (index: number) => {
    if (workExperiences.length <= 1) return
    setWorkExperiences((prevWorkExperiences) => {
      const newWorkExperiences = [...prevWorkExperiences]
      newWorkExperiences.splice(index, 1)
      return newWorkExperiences
    })
  }

  const handleSave = () => {
    // TODO: include api call to save changes
    handleNext()
  }

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="600"> Professional Experience </Text>
      <Text color="secondary.500" marginTop="1" marginBottom="8"> Highlight up to 5 of your previous job experiences! </Text>
      {role === 'Mentee' && (
        <Box marginTop="5">
          <ControlledSelect error={errors.careerAspiration} label="Career Aspiration" options={careerOptions} placeholder={''} selectProps={{ onChange: handleCareerAspirationsChange, value: careerAspiration }} />
        </Box>
      )}
      {workExperiences.map((workExperience, index) => {
        const { jobTitle, company, description } = workExperience
        return (
          <>
            <Flex justifyContent="space-between" marginY="8">
              <Text size="md" fontWeight="600" marginBottom="3"> Work Experience {index + 1} </Text>
              <Icon name="delete" _hover={{ cursor: 'pointer' }} color={workExperiences.length <= 1 ? 'secondary.200' : 'secondary.500'} onClick={() => handleDeleteWorkExperience(index)} />
            </Flex>
            <SimpleGrid columns={[1, null, 2]} spacing="4" spacingY="55">
              <Box marginBottom={ isMdUp ? '55' : '0'}>
                <ControlledTextInput error={errors.jobTitle} label={'Job Title'} type={'text'} placeholder={''} inputProps={{ onChange: (e) => handleWorkExperienceChange(e, index, 'jobTitle'), value: jobTitle }} />
              </Box>
              <Box marginBottom='55'>
                <ControlledTextInput error={errors.company} label={'Company'} type={'text'} placeholder={''} inputProps={{ onChange: (e) => handleWorkExperienceChange(e, index, 'company'), value: company }} />
              </Box>
            </SimpleGrid>
            <FormLabel> Description </FormLabel>
            <Textarea borderColor={errors.description ? 'red.600' : 'inherit'} borderWidth={errors.description ? '2px' : '1px'} placeholder="Describe what you did at your previous company" value={description} onChange={(e)=> handleWorkExperienceChange(e, index, 'description')} />
            {!!errors.description && <Text position="absolute" fontSize="xs" color="red.600" >{errors.description}</Text>}
          </>
        )
      })}
      <Box marginY="10">
        <Button size="sm" onClick={handleAddWorkExperience}> + Add Work Experience</Button>
      </Box>

      <Flex justifyContent="end" gap="4">
        <Button onClick={handleBack}>Back</Button>
        <Button colorScheme="red" onClick={handleSave}>Next</Button>
      </Flex>
    </Box>
  )
}

export default ProfessionalExperience
