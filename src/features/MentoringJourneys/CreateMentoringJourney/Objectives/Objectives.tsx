import {
  Box, Button, Flex, Text,
  Textarea,
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { ControlledSelect } from '../../../../components'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { getObjectives } from '../redux/selectors'
import { setMentoringOutcome, setOutcomeDescription } from '../redux/mentoringJourneyFormSlice'

interface ObjectivesProps {
  handleNextStep: (toStep: number) => void
  handlePrevStep: () => void
}

const mentoringOutcomes: string[] = ['Skill Development', 'Career Advancement', 'Education Advancement', 'Career Transition', 'Personal Development']

function Objectives(props: ObjectivesProps) {
  const { handleNextStep, handlePrevStep } = props
  const dispatch = useAppDispatch()
  const { outcome, description } = useAppSelector(getObjectives)

  const handleOutcomeChange = (e: ChangeEvent<HTMLSelectElement>) => dispatch(setMentoringOutcome(e.target.value))
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => dispatch(setOutcomeDescription(e.target.value))

  return (
    <Flex mt="4" flexDir="column">
      <Box width="400px" maxWidth="100%" mb="8">
        <Text>Mentoring Outcome</Text>
        <Text mb="2" fontSize="xs" color="secondary.300">
          What would you like to achieve from this mentoring journey?
        </Text>
        <ControlledSelect error={outcome.error} options={mentoringOutcomes} selectProps={{ value: outcome.value, onChange: handleOutcomeChange }} />
      </Box>
      <Box mb="8">
        <Text>Describe your outcome in greater detail</Text>
        <Text mb="2" fontSize="xs" color="secondary.300">
          Provide an in-depth explanation of your ultimate goal,so that we can effectively guide you to reach it!
        </Text>
        <Textarea
          borderColor={description.error ? 'red.600' : 'inherit'}
          borderWidth={description.error ? '2px' : '1px'}
          value={description.value}
          onChange={handleDescriptionChange}
        />
        {!!description.error && <Text position="absolute" fontSize="xs" color="red.600">{description.error}</Text>}
      </Box>
      <Flex justify="flex-end" gap="4">
        <Button colorScheme="red" variant="outline" onClick={handlePrevStep}>Back</Button>
        <Button colorScheme="red" onClick={() => handleNextStep(3)}>Next</Button>
      </Flex>
    </Flex>
  )
}

export default Objectives
