import {
  Divider, Tab, TabList, TabPanel,
  TabPanels, Tabs,
} from '@chakra-ui/react'
import { BackButton, Container } from '../../../components'
import paths from '../../../paths'
import Overview from './Overview'

function MentoringJourneyDetails() {
  return (
    <Container position="relative">
      <BackButton path={paths.MentoringJourneys.ViewAll} />
      <Divider position="absolute" left="0" mt="6" />
      <Tabs mt="12" colorScheme="red">
        <TabList gap="6" maxWidth="min-content">
          <Tab py="1">Overview</Tab>
          <Tab py="1">Milestones</Tab>
          <Tab py="1">Feedback</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px="0">
            <Overview />
          </TabPanel>
          <TabPanel px="0">
            Milestones
          </TabPanel>
          <TabPanel px="0">
            Feedback
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default MentoringJourneyDetails
