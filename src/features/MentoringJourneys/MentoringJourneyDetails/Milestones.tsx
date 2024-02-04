import { useParams } from 'react-router-dom'
import { useGetMilestonesQuery } from '../../../app/services/mentoringJourney/apiMentoringJourneySlice'

function Milestones() {
  const { mentoringJourneyId } = useParams()
  const { data } = useGetMilestonesQuery(mentoringJourneyId!)

  return <>Milestones</>
}

export default Milestones
