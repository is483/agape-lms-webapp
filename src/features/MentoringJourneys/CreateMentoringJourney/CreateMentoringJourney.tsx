import {
  Tab, TabList, TabPanel, TabPanels,
  Tabs, Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Container } from '../../../components'
import { BasicDetails } from './BasicDetails'

function CreateMentoringJourney() {
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }

  const handleNextStep = () => {
    setTabIndex((prevIndex) => prevIndex + 1)
  }

  return (
    <Container>
      <Text fontWeight="600">
        Create Mentoring Journey
      </Text>

      <Tabs colorScheme="red" mt="8" index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab>1. Basic Details</Tab>
          <Tab>2. Objective</Tab>
          <Tab>3. Milestones</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <BasicDetails handleNextStep={handleNextStep} />
          </TabPanel>
          <TabPanel>
            Objectives
          </TabPanel>
          <TabPanel>
            Milestones
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default CreateMentoringJourney
