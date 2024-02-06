import {
  Flex, Text, Box, TabPanels, Tab, TabList, Tabs, TabPanel, Button, Stack,
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

function Sessions() {
  // 1.Sessions page will be reused for Mentee and Mentor.
  // a.The main Sessions function will be the container handling the whole interface. (ie, we will include the table, calendar inside here but in separate functions)
  // i.Mentor will need to include dropdown (hide it if its unavailable)
  // ii.Create session will be inside the Sessions function
  // b.We will create two mentoringJourney table functions: One for Mentee and One for Mentor
  // c.we can consider putting calendar in a different page so it wont be so messy

  // 2.Create Session will be in a separate folder : CreateSession
  // 3.Session details will also be in a separate folder: Session Details
  // a.Inside the folder, we will have two pages: SessionDetails and EditSessionDetails
  const dispatch = useAppDispatch()
  const { role } = useAppSelector(getAuth)
  const [menteeId, setMenteeId] = useState('')
  const { options: assignedMenteeOptions } = useAssignedMenteesOptions()
  const handleMenteeChange = (e: ChangeEvent<HTMLSelectElement>) => setMenteeId(e.target.value)

  useEffect(() => {
    if (assignedMenteeOptions.length > 0 && !menteeId) {
      const firstMenteeId = assignedMenteeOptions[0].value
      setMenteeId(firstMenteeId)
    }
  }, [assignedMenteeOptions, dispatch, menteeId])

  return (
    <Container minHeight="calc(100vh - 32px)">
      <Flex justify="space-between" mb="4">
        <Box>
          <Text fontWeight="700" fontSize="lg">Sessions </Text>
          <Text fontWeight="400" fontSize="md" color="secondary.500"> Browse upcoming, past and pending sessions all in one place!</Text>
        </Box>
        <Box>
          {role === 'Mentor' && <ControlledSelect options={assignedMenteeOptions} selectProps={{ value: menteeId, onChange: handleMenteeChange }} error="" />}
        </Box>
      </Flex>
      <Calendar />
      <Tabs variant="solid-rounded" colorScheme="red">
        <Stack justify="space-between" alignItems="center" mb="4" direction={['column-reverse', 'column-reverse', 'row']}>
          <TabList gap={['1', '1', '6']} w="max-content" overflowX="auto">
            <Tab py="1">Upcoming</Tab>
            <Tab py="1">Completed</Tab>
            <Tab py="1">Pending</Tab>
          </TabList>
          {role === 'Mentor' && <Button size={['sm', 'sm', null, 'md']} alignSelf={{ base: 'flex-end', md: 'center' }} marginBottom={['5', '5', '0']} colorScheme="red">+ Create Session</Button>}
        </Stack>
        <TabPanels>
          <TabPanel px="0">
            <UpcomingAndPastSessionsTable />
          </TabPanel>
          <TabPanel px="0">
            <UpcomingAndPastSessionsTable />
          </TabPanel>
          <TabPanel px="0">
            <PendingSessionsTable />
          </TabPanel>
        </TabPanels>
      </Tabs>

    </Container>
  )
}
export default Sessions
