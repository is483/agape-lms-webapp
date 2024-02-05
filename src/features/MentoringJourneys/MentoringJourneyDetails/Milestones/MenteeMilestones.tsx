import { Text } from '@chakra-ui/react'
import { useGetMilestoneQuery } from '../../../../app/services/mentoringJourney/apiMentoringJourneySlice'
import { Container } from '../../../../components'
import Milestones from './Milestones'

function MenteeMilestones() {
  const { data } = useGetMilestoneQuery(null)

  return (
    <Container>
      <Text mb="8" fontWeight="600" fontSize="lg">Milestones</Text>
      <Milestones data={data} />
    </Container>
  )
}

export default MenteeMilestones
