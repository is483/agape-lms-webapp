import {
  Flex, Text, Box, TabPanels, Tab, TabList, Tabs, TabPanel, Button, Stack, Hide, useDisclosure,
} from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { getAuth } from '../../app/redux/selectors'
import Container from '../../components/Container'
import { useAppSelector } from '../../hooks'
import { ControlledSelect } from '../../components'
import useAssignedMenteesOptions from '../../hooks/useAssignedMenteesOptions'
import Calendar from './Calendar/Calendar'
import SessionFormModal from './SessionFormModal/SessionFormModal'
import UpcomingAndPastSessionsTable from './SessionsTable/UpcomingAndPastSessionsTable'
import PendingSessionsTable from './SessionsTable/PendingSessionsTable'
import { useLazyGetMenteeSessionsQuery, useLazyGetSessionsQuery } from '../../app/services/session/apiSessionSlice'

function Sessions() {
  const { role } = useAppSelector(getAuth)
  const { isOpen: isSessionFormModalOpen, onOpen: onOpenSessionFormModal, onClose: onSessionFormModalClose } = useDisclosure()
  const [menteeId, setMenteeId] = useState('')
  const [tabIndex, setTabIndex] = useState(0)
  const { options: assignedMenteeOptions } = useAssignedMenteesOptions()
  const [getSessionsByMenteeId, sessionByMenteeIdResult] = useLazyGetMenteeSessionsQuery()
  const [getSessions, sessionResult] = useLazyGetSessionsQuery()
  const handleMenteeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedMenteeId = e.target.value
    setMenteeId(selectedMenteeId)
  }
  const { data } = role === 'Mentor' ? sessionByMenteeIdResult : sessionResult

  // Set mentee ID after assigned mentee have been fetched
  useEffect(() => {
    if (assignedMenteeOptions.length > 0 && !menteeId) {
      const firstMenteeId = assignedMenteeOptions[0].value
      setMenteeId(firstMenteeId)
    }
  }, [assignedMenteeOptions, menteeId])

  // Get mentee sessions when mentee ID is set
  useEffect(() => {
    if (role === 'Mentor' && !!menteeId) {
      getSessionsByMenteeId(menteeId)
    }
  }, [getSessionsByMenteeId, menteeId, role])

  // Get mentee's session if user is mentee
  useEffect(() => {
    if (role === 'Mentee') {
      getSessions(null)
    }
  }, [getSessions, role])

  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }

  const sessions = data ?? []
  const todayDate = new Date()
  const upcomingSessions = sessions.filter(({ status, toDateTime }) => {
    const sessionDate = new Date(toDateTime)
    return status === 'Confirmed' && sessionDate > todayDate
  })
  const pastSessions = sessions.filter(({ status, toDateTime }) => {
    const sessionDate = new Date(toDateTime)
    return status === 'Confirmed' && sessionDate <= todayDate
  })
  const pendingSessions = sessions.filter(({ status }) => status !== 'Confirmed')

  return (
    <Container minHeight="calc(100vh - 32px)">
      <SessionFormModal
        isModalOpen={isSessionFormModalOpen}
        onModalClose={onSessionFormModalClose}
        menteeId={menteeId}
        refetchSessions={() => getSessionsByMenteeId(menteeId)}
      />
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
      <Calendar sessions={data ?? []} goToPendingTab={() => setTabIndex(2)} />
      <Tabs index={tabIndex} onChange={handleTabsChange} variant="solid-rounded" colorScheme="red">
        <Stack justify="space-between" mb="4" direction={['column-reverse', 'column-reverse', 'row']}>
          <TabList gap={['1', '1', '6']} w="max-content" overflowX="auto">
            <Tab py="1" fontSize={['xs', 'sm']}>Upcoming</Tab>
            <Tab py="1" fontSize={['xs', 'sm']}>Completed</Tab>
            <Tab py="1" fontSize={['xs', 'sm']}>Pending</Tab>
          </TabList>
          {role === 'Mentor' && <Button size="sm" alignSelf={{ base: 'flex-end', md: 'center' }} marginBottom={['5', '5', '0']} colorScheme="red" onClick={onOpenSessionFormModal}>+ Create Session</Button>}
        </Stack>
        <TabPanels>
          <TabPanel px="0" pt="0">
            <UpcomingAndPastSessionsTable data={upcomingSessions} />
          </TabPanel>
          <TabPanel px="0" pt="0">
            <UpcomingAndPastSessionsTable data={pastSessions} />
          </TabPanel>
          <TabPanel px="0" pt="0">
            <PendingSessionsTable refetchSessions={() => getSessions(null)} data={pendingSessions} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}
export default Sessions
