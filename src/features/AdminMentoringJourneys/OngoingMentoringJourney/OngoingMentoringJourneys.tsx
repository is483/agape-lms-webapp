import {
  Flex,
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import Metrics from '../components/Metrics'
import { ControlledSelect } from '../../../components'
import { AdminMentoringJourney } from '../../../app/services/mentoringJourney/types'
import useAllMentorOptions from '../../../hooks/useAllMentorOptions'
import { useGetAllMentoringJourneyByIdAdminQuery } from '../../../app/services/mentoringJourney/apiMentoringJourneySlice'
import MentoringJourneyTable from '../components/MentoringJourneyTable'

interface OngoingMentoringJourneysProps {
  data: AdminMentoringJourney[]
}

function OngoingMentoringJourneys(props: OngoingMentoringJourneysProps) {
  const { options: mentorOptions } = useAllMentorOptions()
  const [mentorId, setMentorId] = useState('0')
  const { data: mentoringJourneysById } = useGetAllMentoringJourneyByIdAdminQuery(mentorId)
  const ongoingMentoringJourneysById = mentoringJourneysById?.filter(({ status }) => status === 'in_progress')
  const handleMentorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedMentorId = e.target.value
    setMentorId(selectedMentorId)
  }
  const { data } = props
  const dataToRender = mentorId === '0' ? data : ongoingMentoringJourneysById
  return (
    <Flex direction="column">
      <Metrics status="in_progress" />
      <Flex justify="flex-end" marginY="5">
        <ControlledSelect options={mentorOptions} selectProps={{ value: mentorId, onChange: handleMentorChange }} error="" />
      </Flex>
      <MentoringJourneyTable data={dataToRender ?? []} />
    </Flex>
  )
}
export default OngoingMentoringJourneys
