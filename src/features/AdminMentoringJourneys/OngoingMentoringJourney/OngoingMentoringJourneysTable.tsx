import {
  TableContainer, Flex,
  Table, Thead, Tbody, Tr, Th, Td, Button,
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import Metrics from '../Metrics'
import { ControlledSelect, Link, ProfileIcon } from '../../../components'
import { AdminMentoringJourney } from '../../../app/services/mentoringJourney/types'
import paths from '../../../paths'
import useAllMentorOptions from '../../../hooks/useAllMentorOptions'
import {useGetAllMentoringJourneyByIdAdminQuery } from '../../../app/services/mentoringJourney/apiMentoringJourneySlice'

interface OngoingMentoringJourneysTableProps {
  data: AdminMentoringJourney[]
}

function OngoingMentoringJourneysTable(props: OngoingMentoringJourneysTableProps) {
  const { options: mentorOptions } = useAllMentorOptions()
  const [mentorId, setMentorId] = useState('0')
  const { data: mentoringsJourneyById } = useGetAllMentoringJourneyByIdAdminQuery(mentorId)
  const handleMentorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedMentorId = e.target.value
    setMentorId(selectedMentorId)
  }
  const { data } = props
  const dataToRender = mentorId === '0' ? data : mentoringsJourneyById
  return (
    <Flex direction="column">
      <Metrics status="Ongoing" />
      <Flex justify="flex-end" marginY="5">
        <ControlledSelect options={mentorOptions} selectProps={{ value: mentorId, onChange: handleMentorChange }} error="" />
      </Flex>
      <TableContainer whiteSpace="unset" width="100%">
        <Table variant="simple">
          <Thead backgroundColor="gray.100">
            <Tr>
              <Th>Mentor</Th>
              <Th>Mentee</Th>
              <Th>Title</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {dataToRender?.length === 0 && (
              <Tr>
                <Td colSpan={4}>
                  <Flex height="40px" justify="center" align="center">
                    No Mentoring Journey
                  </Flex>
                </Td>
              </Tr>
            )}
            {dataToRender?.map((mentoringJourney) => {
              const {
                mentorImgUrl, mentorFirstName, mentorLastName, menteeImgUrl, menteeFirstName, menteeLastName, title, mentoringJourneyId,
              } = mentoringJourney

              return (
                <Tr>
                  <Td>
                    <Flex gap="4" align="center">
                      <ProfileIcon imgUrl={mentorImgUrl} width="32px" height="32px" iconProps={{ fontSize: '24px' }} />
                      {mentorFirstName} {mentorLastName}
                    </Flex>
                  </Td>
                  <Td>
                    <Flex gap="4" align="center">
                      <ProfileIcon imgUrl={menteeImgUrl} width="32px" height="32px" iconProps={{ fontSize: '24px' }} />
                      {menteeFirstName} {menteeLastName}
                    </Flex>
                  </Td>
                  <Td>
                    {title}
                  </Td>

                  <Td>
                    <Flex justify="end" gap="4">
                      <Link to={`${paths.Sessions.Details.subPath}/${mentoringJourneyId}`}>
                        <Button colorScheme="red">View Details</Button>
                      </Link>
                      <Button colorScheme="red" variant="outline">
                        Delete
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              )
            })}

          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  )
}
export default OngoingMentoringJourneysTable
