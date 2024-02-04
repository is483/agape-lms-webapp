import { useParams } from 'react-router-dom'
import { useGetMilestonesQuery } from '../../../app/services/mentoringJourney/apiMentoringJourneySlice'
import { MilestonesBoard } from '../../MilestonesBoard'

function Milestones() {
  const { mentoringJourneyId } = useParams()
  const { data } = useGetMilestonesQuery(mentoringJourneyId!)

  if (!data) return null

  const { milestones } = data

  return (
    <MilestonesBoard data={milestones} startDate={milestones[0]?.startDate ?? ''} isEditable={false} />
  )
}

export default Milestones
