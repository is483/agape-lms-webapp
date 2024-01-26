import { Box } from '@chakra-ui/react'
import { MilestonesBoard } from '../../../MilestonesBoard'
import { useAppSelector } from '../../../../hooks'
import { getBasicDetails, getMilestones } from '../redux/selectors'

function Milestones() {
  const { milestones } = useAppSelector(getMilestones)
  const { date } = useAppSelector(getBasicDetails)
  return (
    <Box>
      <MilestonesBoard data={milestones} startDate={date.value} isEditable />
    </Box>
  )
}

export default Milestones
