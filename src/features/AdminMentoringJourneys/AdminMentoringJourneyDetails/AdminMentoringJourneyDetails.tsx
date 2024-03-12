import {
  Divider, Tab, TabList, TabPanel,
  TabPanels, Tabs,
} from '@chakra-ui/react'
import { BackButton, Container } from '../../../components'
import paths from '../../../paths'
import Feedback from './AdminFeedback/AdminFeedback'
import Metrics from './Metrics/Metrics'
import Overview from '../../MentoringJourneys/MentoringJourneyDetails/Overview'

function AdminMentoringJourneyDetails() {
  return (
    <Container position="relative" minH="calc(100vh - 34px)">
      <BackButton path={paths.AdminMentoringJourneys.ViewAll} />
      <Divider position="absolute" left="0" mt="6" />
      <Tabs mt="12" colorScheme="red">
        <TabList gap={['1', '2', '20']} maxWidth="min-content">
          <Tab py="1" px={['1', '2', '4']} fontSize={['xs', 'sm', 'md']}>Overview</Tab>
          <Tab py="1" px={['1', '2', '4']} fontSize={['xs', 'sm', 'md']} whiteSpace="nowrap">Key Metrics</Tab>
          <Tab py="1" px={['1', '2', '4']} fontSize={['xs', 'sm', 'md']}>Milestones</Tab>
          <Tab py="1" px={['1', '2', '4']} fontSize={['xs', 'sm', 'md']}>Sessions</Tab>
          <Tab py="1" px={['1', '2', '4']} fontSize={['xs', 'sm', 'md']}>Feedback</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px="0">
            <Overview />
          </TabPanel>
          <TabPanel px="0">
            <Metrics />
          </TabPanel>
          <TabPanel px="0" />
          <TabPanel px="0" />
          <TabPanel px="0">
            <Feedback />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default AdminMentoringJourneyDetails
