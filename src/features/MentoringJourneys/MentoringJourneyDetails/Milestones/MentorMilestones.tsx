import { useParams } from 'react-router-dom'
import { useGetMilestonesQuery } from '../../../../app/services/mentoringJourney/apiMentoringJourneySlice'
import Milestones from './Milestones'

function MentorMilestones() {
  const { mentoringJourneyId } = useParams()
  const { data } = useGetMilestonesQuery(mentoringJourneyId!)

  return (
    <Milestones data={data} />
  )
}

export default MentorMilestones
