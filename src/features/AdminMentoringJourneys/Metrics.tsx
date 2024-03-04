import {
  Flex,
} from '@chakra-ui/react'
import { InfographicItem } from '../../components'

interface MetricProps {
  status: string
}

function Metrics(props: MetricProps) {
  const { status } = props
  return (
    <Flex marginTop="5" gap="10">
      <InfographicItem title="No. of Mentors" amount={0} iconName="taunt"/>
      <InfographicItem title="No. of Mentees" amount={0} iconName="group" />
      <InfographicItem title="Mentoring Journeys" amount={0} iconName="conversion_path" />
    </Flex>
  )
}
export default Metrics
