import {
  Flex, Tabs, TabList, Tab, TabPanels, TabPanel, Text, Box,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetAllSessionsByMentoringJourneyQuery } from '../../../../app/services/session/apiSessionSlice'
import UpcomingAndPastSessionsTable from '../../../Sessions/SessionsTable/UpcomingAndPastSessionsTable'
import PendingSessionsTable from '../../../Sessions/SessionsTable/PendingSessionsTable'

function AdminSessions() {
  const [tabIndex, setTabIndex] = useState(0)
  const { mentoringJourneyId } = useParams()

  const { data } = useGetAllSessionsByMentoringJourneyQuery(mentoringJourneyId!)

  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }
  const sortedSessions = [...(data ?? [])].sort((a, b) => {
    const dateA = new Date(a.fromDateTime).getTime()
    const dateB = new Date(b.fromDateTime).getTime()
    return dateB - dateA
  })
  const todayDate = new Date()
  const upcomingSessions = sortedSessions.filter(({ status, toDateTime }) => {
    const sessionDate = new Date(toDateTime)
    return status === 'Confirmed' && sessionDate > todayDate
  })
  const pastSessions = sortedSessions.filter(({ status, toDateTime }) => {
    const sessionDate = new Date(toDateTime)
    return status === 'Confirmed' && sessionDate <= todayDate
  })
  const pendingSessions = sortedSessions.filter(({ status }) => status !== 'Confirmed')

  return (
    <Box>
      <Flex justify="space-between" marginY="4" gap="2">
        <Box>
          <Text fontWeight="400" fontSize="md" color="secondary.500"> Browse upcoming, past and pending sessions all in one place!</Text>
        </Box>
      </Flex>
      <Tabs index={tabIndex} onChange={handleTabsChange} variant="solid-rounded" colorScheme="red">
        <TabList gap={['1', '1', '6']} w="max-content" overflowX="auto">
          <Tab py="1" fontSize={['xs', 'sm']}>All </Tab>
          <Tab py="1" fontSize={['xs', 'sm']}>Upcoming</Tab>
          <Tab py="1" fontSize={['xs', 'sm']}>Completed</Tab>
          <Tab py="1" fontSize={['xs', 'sm']}>Pending</Tab>
        </TabList>
        <TabPanels mt="10">
          <TabPanel px="0" pt="0">
            <UpcomingAndPastSessionsTable data={sortedSessions} showStatus />
          </TabPanel>
          <TabPanel px="0" pt="0">
            <UpcomingAndPastSessionsTable data={upcomingSessions} showStatus={false} />
          </TabPanel>
          <TabPanel px="0" pt="0">
            <UpcomingAndPastSessionsTable data={pastSessions} showStatus={false} />
          </TabPanel>
          <TabPanel px="0" pt="0">
            <PendingSessionsTable refetchMenteeSessions={() => null} refetchMentorSessions={() => null} data={pendingSessions} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
export default AdminSessions
