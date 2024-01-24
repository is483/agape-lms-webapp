import {
  Tab, TabList, TabPanel, TabPanels,
  Tabs, Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Container } from '../../../components'
import { BasicDetails } from './BasicDetails'
import { useValidateBasicDetails } from './hooks'
import { Objectives } from './Objectives'

function CreateMentoringJourney() {
  const [tabIndex, setTabIndex] = useState(0)
  const validateBasicDetails = useValidateBasicDetails()

  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }

  const handleNextStep = (toStep: number) => {
    const goNextStep = () => setTabIndex((prevIndex) => prevIndex + 1)

    if (toStep === 2) { // Basic Details Complete
      !validateBasicDetails() && goNextStep()
    } else if (toStep === 3) { // Objective Complete
      // TODO
    } else if (toStep === 4) { // Milestones Complete
      // TODO
    }
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
          <TabPanel px="0">
            <BasicDetails handleNextStep={handleNextStep} />
          </TabPanel>
          <TabPanel px="0">
            <Objectives handleNextStep={handleNextStep} />
          </TabPanel>
          <TabPanel px="0">
            Milestones
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default CreateMentoringJourney
