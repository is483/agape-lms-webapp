import {
  Box, Flex, Text, Button, Alert, AlertIcon,
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import ReactQuill from 'react-quill'
import { ControlledSelect, ControlledTextInput } from '../../../../components'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { getBasicDetails } from '../redux/selectors'
import {
  setDate, setDescription, setMentee, setTitle,
} from '../redux/mentoringJourneyFormSlice'
import useUnassignedMenteesOptions from '../../../../hooks/useUnassignedMenteesOptions'

interface BasicDetailsProps {
  handleNextStep: (toStep: number) => void
}

function BasicDetails(props: BasicDetailsProps) {
  const { handleNextStep } = props
  const dispatch = useAppDispatch()
  const {
    menteeId, title, date, description,
  } = useAppSelector(getBasicDetails)
  const { options: unassignedMenteeOptions, menteeIdToMenteeName } = useUnassignedMenteesOptions()

  const handleMenteeChange = (e: ChangeEvent<HTMLSelectElement>) => dispatch(setMentee({ menteeId: e.target.value, menteeName: menteeIdToMenteeName[e.target.value] }))
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setTitle(e.target.value))
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setDate(e.target.value))
  const handleDescriptionChange = (description: string) => dispatch(setDescription(description))

  return (
    <>
      {!unassignedMenteeOptions.length && (
        <Alert status="error" variant="left-accent" background="red.50">
          <AlertIcon />
          All mentees have been assigned.
        </Alert>
      )}
      <Flex mt="12" flexDir="column">
        <Box width="400px" maxWidth="100%" mb="12">
          <ControlledSelect error={menteeId.error} options={unassignedMenteeOptions} label="Mentee" selectProps={{ value: menteeId.value, onChange: handleMenteeChange }} />
        </Box>
        <Box width="400px" maxWidth="100%" mb="5">
          <ControlledTextInput error={title.error} label="Title" type="text" inputProps={{ value: title.value, onChange: handleTitleChange }} />
        </Box>
        <Box width="400px" maxWidth="100%" mb="8">
          <Text>Start Date</Text>
          <Text mb="2" fontSize="xs" color="secondary.300">All mentoring journeys have a default period of 12 months</Text>
          <ControlledTextInput error={date.error} type="date" inputProps={{ value: date.value, onChange: handleDateChange, min: new Date().toISOString().split('T')[0] }} />
        </Box>
        <Box mb="8">
          <Text>Description</Text>
          <ReactQuill
            theme="snow"
            className="react-quill-update"
            value={description.value}
            onChange={handleDescriptionChange}
          />
        </Box>
        <Flex justify="flex-end">
          <Button colorScheme="red" onClick={() => handleNextStep(2)}>Next</Button>
        </Flex>
      </Flex>
    </>
  )
}

export default BasicDetails
