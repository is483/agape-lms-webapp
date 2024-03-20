import { Text } from '@chakra-ui/react'
import { useGetMilestoneQuery } from '../../../../app/services/mentoringJourney/apiMentoringJourneySlice'
import { Container } from '../../../../components'
import Milestones from './Milestones'

function MenteeMilestones() {
  const { data } = useGetMilestoneQuery(null)

  return (
    <Container minHeight="calc(100vh - 32px)">
      <Text mb="8" fontWeight="600" fontSize="lg">Milestones</Text>
      <Milestones data={data} />
      {!data && (
        <Text> Oops, your milestone board will only be visible after a mentoring journey has been created with you. Do follow up with your assigned mentor about it. If you do not have an assigned mentor yet, reach out to Agape!</Text>
      )}
    </Container>
  )
}

export default MenteeMilestones
