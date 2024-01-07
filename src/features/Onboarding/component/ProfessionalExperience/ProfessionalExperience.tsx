import {
  Box, Button, Flex, FormControl,
  FormLabel, Input, SimpleGrid, Text,
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { Icon } from '../../../../components'

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

const defaultWorkExperiences: WorkExperience[] = [{ ...defaultWorkExperience }]

function ProfessionalExperience(props: Props) {
  const { handleBack, handleNext } = props
  const [workExperiences, setWorkExperiences] = useState(defaultWorkExperiences)
  const handleSave = () => {
    // TODO: include api call to save changes
    handleNext()
  }
  const handleAddWorkExperience = () => {
    setWorkExperiences((prevWorkExperiences) => [
      ...prevWorkExperiences, { ...defaultWorkExperience },
    ])
  }

  const handleWorkExperienceChange = (
    e: ChangeEvent<HTMLInputElement>, index: number, key: keyof WorkExperience) => {
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

  return (
    <Box>
      {workExperiences.map((workExperience, index) => {
        const { jobTitle, company, description } = workExperience
        return (
          <>
            <Flex justifyContent="space-between" marginTop="8">
              <Text size="md" fontWeight="600" marginBottom="3"> Work Experience {index + 1} </Text>
              <Icon name="delete" _hover={{ cursor: 'pointer' }} color={workExperiences.length <= 1 ? 'secondary.200' : 'secondary.500'} onClick={() => handleDeleteWorkExperience(index)} />
            </Flex>
            <SimpleGrid columns={[1, null, 2]} spacing="4" spacingY="4">
              <Box>
                <FormControl>
                  <FormLabel>Job Title</FormLabel>
                  <Input
                    placeholder="Job Title"
                    value={jobTitle}
                    onChange={(e) => handleWorkExperienceChange(e, index, 'jobTitle')}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <FormLabel>Company</FormLabel>
                  <Input
                    placeholder="Company"
                    value={company}
                    onChange={(e) => handleWorkExperienceChange(e, index, 'company')}
                  />
                </FormControl>
              </Box>
            </SimpleGrid>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Description"
                value={description}
                onChange={(e) => handleWorkExperienceChange(e, index, 'description')}
              />
            </FormControl>
          </>
        )
      })}
      <Box marginY="5">
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
