import {
  Box, Tab, TabList, TabPanel, TabPanels, Tabs, Text,
} from '@chakra-ui/react'
import { Container } from '../../components'
import OngoingMentoringJourneysTable from './OngoingMentoringJourney/OngoingMentoringJourneysTable'
import CompletedMentoringJourneysTable from './CompletedMentoringJourneys.tsx/CompletedMentoringJourneysTable'
import FailedMentoringJourneysTable from './FailedMentoringJourneys.tsx/FailedMentoringJourneysTable'

function AdminMentoringJourneys() {
  return (
    <Container minH="calc(100vh - 34px)">
      <Box marginBottom="10">
        <Text fontSize="lg" fontWeight="700" mb="4">Welcome</Text>
        <Text>
          This is a dedicated space for you to monitor and oversee all mentoring journeys created on the platform!<br />
        </Text>
      </Box>
      <Tabs variant="solid-rounded" colorScheme="red">
        <TabList gap="6">
          <Tab py="1" fontSize={['xs', 'sm']}>Ongoing</Tab>
          <Tab py="1" fontSize={['xs', 'sm']}>Completed</Tab>
          <Tab py="1" fontSize={['xs', 'sm']}>Failed</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px="0">
            <OngoingMentoringJourneysTable />
          </TabPanel>
          <TabPanel px="0">
            <CompletedMentoringJourneysTable />
          </TabPanel>
          <TabPanel px="0">
            <FailedMentoringJourneysTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default AdminMentoringJourneys
