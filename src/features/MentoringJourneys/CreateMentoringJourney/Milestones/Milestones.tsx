import {
  Box, Button, Flex, Text,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { MilestonesBoard } from '../../../MilestonesBoard'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { getBasicDetails, getMilestones } from '../redux/selectors'
import { initMilestone } from '../../../../configs/agape-test/agape-external-test'
import { setMilestones } from '../redux/mentoringJourneyFormSlice'

interface MilestoneProps {
  handleNextStep: (toStep: number) => void
  handlePrevStep: () => void
  isCreatingMentoringJourney: boolean
}

function Milestones(props: MilestoneProps) {
  const { handleNextStep, handlePrevStep, isCreatingMentoringJourney } = props
  const { milestones } = useAppSelector(getMilestones)
  const { menteeName, date } = useAppSelector(getBasicDetails)
  const { error } = useAppSelector(getMilestones)
  const dispatch = useAppDispatch()

  // TODO: only for agape test
  useEffect(() => {
    if (!date.value || !menteeName.value || !dispatch) return
    dispatch(setMilestones(initMilestone(date.value, menteeName.value)))
  }, [date.value, dispatch, menteeName.value])

  return (
    <Box maxWidth="100%" position="absolute" pt="8">
      {!!error && <Text position="absolute" top="0" color="red.600">{error}</Text>}
      <MilestonesBoard data={milestones} startDate={date.value} isEditable isCreated={false} />
      <Flex justify="flex-end" gap="4" mt="4">
        <Button colorScheme="red" variant="outline" onClick={handlePrevStep}>Back</Button>
        <Button colorScheme="red" onClick={() => handleNextStep(4)} isLoading={isCreatingMentoringJourney}>Next</Button>
      </Flex>
    </Box>
  )
}

export default Milestones
