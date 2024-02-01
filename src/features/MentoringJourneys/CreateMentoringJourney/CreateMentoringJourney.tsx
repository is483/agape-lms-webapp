import {
  Divider, Flex, Tab, TabList,
  TabPanel, TabPanels, Tabs, Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Container, Icon, Link } from '../../../components'
import { BasicDetails } from './BasicDetails'
import { useValidateBasicDetails, useValidateMilestones, useValidateObjectives } from './hooks'
import { Objectives } from './Objectives'
import { Milestones } from './Milestones'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { clearBasicDetailsErrors, clearObjectiveErrors } from './redux/mentoringJourneyFormSlice'
import paths from '../../../paths'
import { useCreateMentoringJourneyMutation } from '../../../app/services/mentoringJourney/apiMentoringJourneySlice'
import { CreateMentoringJourneyRequest } from '../../../app/services/mentoringJourney/types'
import { getBasicDetails, getMilestones, getObjectives } from './redux/selectors'

function CreateMentoringJourney() {
  const [tabIndex, setTabIndex] = useState(0)
  const validateBasicDetails = useValidateBasicDetails()
  const validateObjectives = useValidateObjectives()
  const validateMilestones = useValidateMilestones()
  const [createMentoringJourney] = useCreateMentoringJourneyMutation()
  const basicDetails = useAppSelector(getBasicDetails)
  const objectives = useAppSelector(getObjectives)
  const milestones = useAppSelector(getMilestones)
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
      !validateMilestones() && setTabIndex(index)
    }
  }

  const handleNextStep = (toStep: number) => {
    const goNextStep = () => setTabIndex((prevIndex) => prevIndex + 1)

    if (toStep === 2) { // Basic Details Complete
      !validateBasicDetails() && goNextStep()
    } else if (toStep === 3) { // Objective Complete
      !validateObjectives() && goNextStep()
    } else if (toStep === 4) { // Milestones Complete
      !validateMilestones() && handleSave()
      window.scrollTo({ top: 0 })
    }
  }

  const handlePrevStep = () => {
    if (tabIndex > 0) {
      setTabIndex((prevIndex) => prevIndex - 1)
    }
  }

  const handleSave = async () => {
    // TODO: send the mentoring journey data to the server
    // TODO: route to mentoring journey view all page
    const request: CreateMentoringJourneyRequest = {
      menteeId: basicDetails.menteeId.value,
      title: basicDetails.title.value,
      startDate: basicDetails.date.value,
      description: basicDetails.description.value,
      mentoringOutcome: objectives.outcome.value,
      outcomeDescription: objectives.description.value,
      milestones: milestones.milestones,
    }

    await createMentoringJourney(request).unwrap()
  }

  return (
    <Container position="relative">
      <Link fontSize="lg" fontWeight="600" to={paths.MentoringJourneys.ViewAll} gap="2" _hover={{ textDecoration: 'none' }}>
        <Flex align="center">
          <Icon name="arrow_back" />
          Back
        </Flex>
      </Link>
      <Divider position="absolute" left="0" mt="6" />
      <Text fontSize="lg" fontWeight="600" mt="12">
        Create Mentoring Journey
      </Text>
      <Tabs colorScheme="red" mt="8" index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab fontSize={['xs', null, 'md']}>1. Basic Details</Tab>
          <Tab fontSize={['xs', null, 'md']}>2. Objective</Tab>
          <Tab fontSize={['xs', null, 'md']}>3. Milestones</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px="0">
            {tabIndex === 0 && <BasicDetails handleNextStep={handleNextStep} />}
          </TabPanel>
          <TabPanel px="0">
            {tabIndex === 1 && <Objectives handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />}
          </TabPanel>
          <TabPanel px="0" height={['calc(65vh + 124px)', null, 'calc(65vh + 108px)']}>
            {tabIndex === 2 && <Milestones handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default CreateMentoringJourney
