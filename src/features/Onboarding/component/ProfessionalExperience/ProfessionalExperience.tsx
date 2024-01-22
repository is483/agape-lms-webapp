import {
  Box, Button, Flex,
  FlexProps,
  FormLabel, SimpleGrid, Text, Textarea, useToast,
} from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { ControlledSelect, ControlledTextInput, Icon } from '../../../../components'
import { getAuth } from '../../../../app/redux/selectors'
import { useAppSelector } from '../../../../hooks'
import { deepCopy } from '../../../../utils'
import { useUpdateMenteeExperienceMutation, useUpdateMentorExperienceMutation } from '../../../../app/services/user/apiUserSlice'
import { ExperienceRequest, MenteeExperienceRequest, TransformedUserResponse } from '../../../../app/services/user/types'

interface Props extends FlexProps {
  handleBack?: () => void
  handleNext?: () => void
  data: TransformedUserResponse | undefined
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
  workExperience: WorkExperience[]
}

const defaultErrors: Errors = {
  careerAspiration: '',
  workExperience: [{ ...defaultWorkExperience }],
}

const careerOptions = ['IT Technician', 'Video Producer', 'Content Creator']

const defaultWorkExperiences: WorkExperience[] = [{ ...defaultWorkExperience }]

function ProfessionalExperience(props: Props) {
  const {
    handleBack, handleNext, data, ...rest
  } = props
  const [updateMenteeExperience, { isLoading: isMenteeLoading }] = useUpdateMenteeExperienceMutation()
  const [updateMentorExperience, { isLoading: isMentorLoading }] = useUpdateMentorExperienceMutation()
  const [workExperiences, setWorkExperiences] = useState(defaultWorkExperiences)
  const [careerAspiration, setCareerAspiration] = useState('')
  const { role } = useAppSelector(getAuth)
  const toast = useToast()
  const [errors, setErrors] = useState<Errors>(defaultErrors)

  useEffect(() => {
    if (!data) return
    setCareerAspiration(data.careerAspiration ?? '')
    setWorkExperiences(deepCopy(data.workExperience))
  }, [data])

  const handleCareerAspirationsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCareerAspiration(e.target.value)
  }
  const handleAddWorkExperience = () => {
    setWorkExperiences((prevWorkExperiences) => [
      ...prevWorkExperiences, { ...defaultWorkExperience },
    ])
    setErrors((prevErrors) => {
      const newErrors = deepCopy(prevErrors) as Errors
      newErrors.workExperience.push({ ...defaultWorkExperience })
      return newErrors
    })
  }

  const handleWorkExperienceChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    index: number, key: keyof WorkExperience) => {
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
    setErrors((prevErrors) => {
      const newErrors = deepCopy(prevErrors) as Errors
      newErrors.workExperience.splice(index, 1)
      return newErrors
    })
  }

  const handleSave = async () => {
    const newErrors: Errors = deepCopy(errors)
    newErrors.careerAspiration = ''
    let hasErrors: boolean = false

    if (role === 'Mentee' && !careerAspiration) {
      newErrors.careerAspiration = 'Career Aspiration required'
      hasErrors = true
    }

    workExperiences.forEach(({ company, description, jobTitle }, i) => {
      newErrors.workExperience[i].company = ''
      newErrors.workExperience[i].description = ''
      newErrors.workExperience[i].jobTitle = ''
      if (!company) {
        newErrors.workExperience[i].company = 'Company is required'
        hasErrors = true
      }
      if (!description) {
        newErrors.workExperience[i].description = 'Description is required'
        hasErrors = true
      }
      if (!jobTitle) {
        newErrors.workExperience[i].jobTitle = 'Job title is required'
        hasErrors = true
      }
    })

    if (hasErrors) {
      setErrors(newErrors)
      return
    }

    try {
      if (role === 'Mentor') {
        const request: ExperienceRequest = {
          workExperience: workExperiences,
        }
        await updateMentorExperience(request)
      } else if (role === 'Mentee') {
        const request: MenteeExperienceRequest = {
          workExperience: workExperiences,
          careerAspiration,
        }
        await updateMenteeExperience(request)
      }

      if (!handleNext) {
        toast({
          title: 'Professional Experience',
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
        <Text fontSize="2xl" fontWeight="600"> Professional Experience </Text>
        <Text color="secondary.500" marginTop="1" marginBottom="8"> Highlight up to 5 of your previous job experiences! </Text>
        {role === 'Mentee' && (
          <Box marginTop="5">
            <ControlledSelect error={errors.careerAspiration} label="Career Aspiration" options={careerOptions} selectProps={{ onChange: handleCareerAspirationsChange, value: careerAspiration }} />
          </Box>
        )}
        {workExperiences.map((workExperience, index) => {
          const { jobTitle, company, description } = workExperience
          return (
            <Box mb="8">
              <Flex justifyContent="space-between" marginY="8">
                <Text size="md" fontWeight="600" marginBottom="3"> Work Experience {index + 1} </Text>
                <Icon name="delete" _hover={{ cursor: 'pointer' }} color={workExperiences.length <= 1 ? 'secondary.200' : 'secondary.500'} onClick={() => handleDeleteWorkExperience(index)} />
              </Flex>
              <SimpleGrid columns={[1, null, 2]} spacing="4" spacingY="55">
                <ControlledTextInput
                  error={errors.workExperience[index]?.jobTitle}
                  label="Job Title"
                  type="text"
                  boxProps={{ mb: '6' }}
                  inputProps={{ onChange: (e) => handleWorkExperienceChange(e, index, 'jobTitle'), value: jobTitle }}
                />
                <ControlledTextInput
                  error={errors.workExperience[index]?.company}
                  label="Company"
                  type="text"
                  boxProps={{ mb: '6' }}
                  inputProps={{ onChange: (e) => handleWorkExperienceChange(e, index, 'company'), value: company }}
                />
              </SimpleGrid>
              <FormLabel> Description </FormLabel>
              <Textarea borderColor={errors.workExperience[index]?.description ? 'red.600' : 'inherit'} borderWidth={errors.workExperience[index]?.description ? '2px' : '1px'} placeholder="Describe what you did at your previous company" value={description} onChange={(e) => handleWorkExperienceChange(e, index, 'description')} />
              {!!errors.workExperience[index]?.description && <Text position="absolute" fontSize="xs" color="red.600">{errors.workExperience[index]?.description}</Text>}
            </Box>
          )
        })}
        <Box marginBottom="10">
          <Button size="sm" onClick={handleAddWorkExperience}> + Add Work Experience</Button>
        </Box>
      </Box>
      <Flex justifyContent="end" gap="4" my="8">
        {handleBack && <Button onClick={handleBack}>Back</Button>}
        <Button isLoading={isMenteeLoading || isMentorLoading} colorScheme="red" onClick={handleSave}>{handleNext ? 'Next' : 'Save'}</Button>
      </Flex>
    </Flex>
  )
}

ProfessionalExperience.defaultProps = {
  handleNext: undefined,
  handleBack: undefined,
}

export default ProfessionalExperience
