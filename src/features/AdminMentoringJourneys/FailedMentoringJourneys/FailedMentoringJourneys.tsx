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

interface FailedMentoringJourneysProps {
  data: AdminMentoringJourney[]
}

function FailedMentoringJourneys(props: FailedMentoringJourneysProps) {
  const { options: mentorOptions } = useAllMentorOptions()
  const [mentorId, setMentorId] = useState('0')
  const { data: mentoringJourneysById } = useGetAllMentoringJourneyByIdAdminQuery(mentorId)
  const failedMentoringJourneysById = mentoringJourneysById?.filter(({ status }) => status === 'failed')
  const handleMentorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedMentorId = e.target.value
    setMentorId(selectedMentorId)
  }
  const { data } = props
  const dataToRender = mentorId === '0' ? data : failedMentoringJourneysById
  return (
    <Flex direction="column">
      <Metrics status="Failed" />
      <Flex justify="flex-end" marginY="5">
        <ControlledSelect options={mentorOptions} selectProps={{ value: mentorId, onChange: handleMentorChange }} error="" />
      </Flex>
      <MentoringJourneyTable data={dataToRender ?? []} />
    </Flex>
  )
}
export default FailedMentoringJourneys