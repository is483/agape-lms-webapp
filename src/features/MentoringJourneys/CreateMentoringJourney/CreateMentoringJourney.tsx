import {
  Tab, TabList, TabPanel, TabPanels,
  Tabs, Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Container } from '../../../components'
import { BasicDetails } from './BasicDetails'
import { useValidateBasicDetails, useValidateObjectives } from './hooks'
import { Objectives } from './Objectives'
import { Milestones } from './Milestones'
import { useAppDispatch } from '../../../hooks'
import { clearBasicDetailsErrors, clearObjectiveErrors } from './redux/mentoringJourneyFormSlice'

function CreateMentoringJourney() {
  const [tabIndex, setTabIndex] = useState(0)
  const validateBasicDetails = useValidateBasicDetails()
  const validateObjectives = useValidateObjectives()
  const dispatch = useAppDispatch()

  const handleTabsChange = (index: number) => {
    if (index < tabIndex) {
      setTabIndex(index)
      dispatch(clearBasicDetailsErrors())
      dispatch(clearObjectiveErrors())
      return
    }
    if (tabIndex === 0) { // Basic Details
      !validateBasicDetails() && setTabIndex(index)
    } else if (tabIndex === 1) { // Objective
      !validateObjectives() && setTabIndex(index)
    } else if (tabIndex === 2) { // Milestones
      // TODO
    }
  }

  const handleNextStep = (toStep: number) => {
    const goNextStep = () => setTabIndex((prevIndex) => prevIndex + 1)

    if (toStep === 2) { // Basic Details Complete
      !validateBasicDetails() && goNextStep()
    } else if (toStep === 3) { // Objective Complete
      !validateObjectives() && goNextStep()
    } else if (toStep === 4) { // Milestones Complete
      // TODO
    }
  }

  const handlePrevStep = () => {
    if (tabIndex > 0) {
      setTabIndex((prevIndex) => prevIndex - 1)
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
            <Objectives handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />
          </TabPanel>
          <TabPanel px="0">
            <Milestones />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default CreateMentoringJourney
