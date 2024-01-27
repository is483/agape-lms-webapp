import { Box } from '@chakra-ui/react'
import { Milestone } from '../MentoringJourneys/CreateMentoringJourney/redux/types'
import MilestoneCard from './MilestoneCard'

interface MilestonesBoardProps {
  data: Milestone[]
  startDate: string
  isEditable: boolean
}

const formatDate = (date: Date) => date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

function MilestonesBoard(props: MilestonesBoardProps) {
  const { data, startDate, isEditable } = props
  return (
    <Box background="blue.50" rounded="md" minHeight="60vh">
      {data.map((milestone, index) => {
        // 60 days per milestone
        const fromDate = new Date(startDate)
        fromDate.setDate(fromDate.getDate() + index * 60)
        const toDate = new Date(startDate)
        toDate.setDate(toDate.getDate() + (index + 1) * 60)
        const dateStr = `${formatDate(fromDate)} - ${formatDate(toDate)} `
        return (
          <MilestoneCard milestone={milestone} index={index} dateStr={dateStr} isEditable={isEditable} />
        )
      })}
    </Box>
  )
}

export default MilestonesBoard
