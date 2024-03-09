import {
  Flex,
} from '@chakra-ui/react'
import { InfographicItem } from '../../../components'
import { useGetAllMentoringJourneyMetricsQuery } from '../../../app/services/mentoringJourney/apiMentoringJourneySlice'

interface MetricProps {
  status: string
}

const getStatusStyles = (status: string) => {
  if (status === 'completed') {
    return { bgColor: 'green.100', fontColor: 'green.500', iconColor: 'green.700' }
  } if (status === 'failed') {
    return { bgColor: 'yellow.200', fontColor: 'yellow.500', iconColor: 'yellow.700' }
  }
  return { bgColor: 'red.100', fontColor: 'red.500', iconColor: 'red.700' }
}

function Metrics(props: MetricProps) {
  const { status } = props
  const { bgColor, fontColor, iconColor } = getStatusStyles(status)
  const { data } = useGetAllMentoringJourneyMetricsQuery(status)
  console.log(data)
  return (
    <Flex marginTop="5" gap="10">
      <InfographicItem
        title="No. of Mentors"
        amount={data?.numberOfMentors ?? 0}
        iconName="taunt"
        containerProps={{
          border: 'solid',
          borderWidth: '1px',
          borderColor: 'secondary.50',
          padding: 4,
          rounded: 'md',
        }}
        circleProps={{
          bg: bgColor,
        }}
        iconProps={{
          color: iconColor,
        }}
        textProps={{
          color: fontColor,
        }}
      />
      <InfographicItem
        title="No. of Mentees"
        amount={data?.numberOfMentees ?? 0}
        iconName="group"
        containerProps={{
          border: 'solid',
          borderWidth: '1px',
          borderColor: 'secondary.50',
          padding: 4,
          rounded: 'md',
        }}
        circleProps={{
          bg: bgColor,
        }}
        iconProps={{
          color: iconColor,
        }}
        textProps={{
          color: fontColor,
        }}
      />
      <InfographicItem
        title="Mentoring Journeys"
        amount={data?.numberOfMentoringJourneys ?? 0}
        iconName="conversion_path"
        containerProps={{
          border: 'solid',
          borderWidth: '1px',
          borderColor: 'secondary.50',
          padding: 4,
          rounded: 'md',
        }}
        circleProps={{
          bg: bgColor,
        }}
        iconProps={{
          color: iconColor,
        }}
        textProps={{
          color: fontColor,
        }}
      />
    </Flex>
  )
}
export default Metrics
