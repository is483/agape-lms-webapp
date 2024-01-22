import {
  Box, Flex, Textarea, Text, Button,
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { ControlledSelect, ControlledTextInput } from '../../../../components'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { getBasicDetails } from '../redux/selectors'
import {
  setDate, setDescription, setMentee, setTitle,
} from '../redux/mentoringJourneyFormSlice'

const assignedMentees: string[] = []

interface Errors {
  mentee: string
  title: string
  date: string
}

const defaultErrors: Errors = {
  mentee: '',
  title: '',
  date: '',
}

interface BasicDetailsProps {
  handleNextStep: () => void
}

function BasicDetails(props: BasicDetailsProps) {
  const { handleNextStep } = props
  const dispatch = useAppDispatch()
  const {
    mentee, title, date, description,
  } = useAppSelector(getBasicDetails)
  const [errors, setErrors] = useState<Errors>({ ...defaultErrors })

  const handleSave = () => {
    handleNextStep()
  }

  const handleMenteeChange = (e: ChangeEvent<HTMLSelectElement>) => dispatch(setMentee(e.target.value))
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setTitle(e.target.value))
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setDate(e.target.value))
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => dispatch(setDescription(e.target.value))

  return (
    <Flex mt="8" flexDir="column">
      <Box width="400px" maxWidth="100%" mb="12">
        <ControlledSelect error={errors.mentee} options={assignedMentees} label="Mentee" selectProps={{ value: mentee, onChange: handleMenteeChange }} />
      </Box>
      <Box width="400px" maxWidth="100%" mb="5">
        <ControlledTextInput error={errors.title} label="Title" type="text" inputProps={{ value: title, onChange: handleTitleChange }} />
      </Box>
      <Box width="400px" maxWidth="100%" mb="8">
        <Text>Start Date</Text>
        <Text mb="2" fontSize="xs" color="secondary.300">All mentoring journeys have a default period of 12 months</Text>
        <ControlledTextInput error={errors.date} type="date" inputProps={{ value: date, onChange: handleDateChange }} />
      </Box>
      <Box mb="8">
        <Text>Description</Text>
        <Textarea value={description} onChange={handleDescriptionChange} />
      </Box>
      <Flex justify="flex-end">
        <Button colorScheme="red" onClick={handleSave}>Next</Button>
      </Flex>
    </Flex>
  )
}

export default BasicDetails
