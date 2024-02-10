import {
  Flex, Text, Box, TabPanels, Tab, TabList, Tabs, TabPanel, Button, Stack, Hide,
} from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { getAuth } from '../../app/redux/selectors'
import Container from '../../components/Container'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { ControlledSelect } from '../../components'
import useAssignedMenteesOptions from '../../hooks/useAssignedMenteesOptions'
import Calendar from './Calendar/Calendar'
import UpcomingAndPastSessionsTable from './SessionsTable/UpcomingAndPastSessionsTable'
import PendingSessionsTable from './SessionsTable/PendingSessionsTable'
import { useLazyGetMenteeSessionsQuery, useLazyGetSessionsQuery } from '../../app/services/session/apiSessionSlice'

function Sessions() {
  const dispatch = useAppDispatch()
  const { role } = useAppSelector(getAuth)
  const [menteeId, setMenteeId] = useState('')
  const [menteeName, setMenteeName] = useState('')
  const { options: assignedMenteeOptions } = useAssignedMenteesOptions()
  const [getMenteeSessions, menteeResult] = useLazyGetMenteeSessionsQuery()
  const [getSessions, sessionResult] = useLazyGetSessionsQuery()
  const handleMenteeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedMenteeId = e.target.value
    setMenteeId(selectedMenteeId)
    const selectedMentee = assignedMenteeOptions.find((option) => option.value === selectedMenteeId)
    if (selectedMentee) {
      setMenteeName(selectedMentee.children)
    }
  }
  const { data } = role === 'Mentor' ? menteeResult : sessionResult

  // Set mentee ID after assigned mentee have been fetched
  useEffect(() => {
    if (assignedMenteeOptions.length > 0 && !menteeId) {
      const firstMenteeId = assignedMenteeOptions[0].value
      setMenteeId(firstMenteeId)
      setMenteeName(menteeName)
    }
  }, [assignedMenteeOptions, dispatch, menteeId, menteeName])

  // Get mentee sessions when mentee ID is set
  useEffect(() => {
    if (role === 'Mentor') {
      if (!menteeId) return
      getMenteeSessions(menteeId)
    } else {
      getSessions(null)
    }
  }, [menteeId, getMenteeSessions, getSessions, role])

  const sessions = data ?? []
  const todayDate = new Date()
  const upcomingSessions = sessions.filter(({ status, fromDateTime }) => {
    const sessionDate = new Date(fromDateTime)
    return status === 'Confirmed' && sessionDate > todayDate
  })
  const pastSessions = sessions.filter(({ status, fromDateTime }) => {
    const sessionDate = new Date(fromDateTime)
    return status === 'Confirmed' && sessionDate <= todayDate
  })
  const pendingSessions = sessions.filter(({ status }) => status === 'Pending' || status === 'Rejected')
  const calendarDates = sessions.map((session) => session.fromDateTime)

  return (
    <Container minHeight="calc(100vh - 32px)">
      <Flex justify="space-between" mb="4" gap="2">
        <Box>
          <Text fontWeight="700" fontSize="lg">Sessions </Text>
          <Hide below="sm">
            <Text fontWeight="400" fontSize="md" color="secondary.500"> Browse upcoming, past and pending sessions all in one place!</Text>
          </Hide>
        </Box>
        <Box>
          {role === 'Mentor' && <ControlledSelect options={assignedMenteeOptions} selectProps={{ value: menteeId, onChange: handleMenteeChange }} error="" />}
        </Box>
      </Flex>
      <Hide above="sm">
        <Text fontWeight="400" fontSize="md" color="secondary.500"> Browse upcoming, past and pending sessions all in one place!</Text>
      </Hide>
      <Calendar datesWithSessions={calendarDates} />
      <Tabs variant="solid-rounded" colorScheme="red">
        <Stack justify="space-between" mb="4" direction={['column-reverse', 'column-reverse', 'row']}>
          <TabList gap={['1', '1', '6']} w="max-content" overflowX="auto">
            <Tab py="1" fontSize={['xs', 'sm']}>Upcoming</Tab>
            <Tab py="1" fontSize={['xs', 'sm']}>Completed</Tab>
            <Tab py="1" fontSize={['xs', 'sm']}>Pending</Tab>
          </TabList>
          {role === 'Mentor' && <Button size="sm" alignSelf={{ base: 'flex-end', md: 'center' }} marginBottom={['5', '5', '0']} colorScheme="red">+ Create Session</Button>}
        </Stack>
        <TabPanels>
          <TabPanel px="0" pt="0">
            <UpcomingAndPastSessionsTable data={upcomingSessions} />
          </TabPanel>
          <TabPanel px="0" pt="0">
            <UpcomingAndPastSessionsTable data={pastSessions} />
          </TabPanel>
          <TabPanel px="0" pt="0">
            <PendingSessionsTable data={pendingSessions} />
          </TabPanel>
        </TabPanels>
      </Tabs>

    </Container>
  )
}
export default Sessions
