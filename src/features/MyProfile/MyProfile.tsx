import {
  Box, useSteps, Hide, Flex, Text, Accordion, AccordionButton, AccordionItem, AccordionPanel,
} from '@chakra-ui/react'
import Container from '../../components/Container'
import { Icon } from '../../components'
import { useGetUserInfoQuery } from '../../app/services/user/apiUserSlice'
import { getAuth } from '../../app/redux/selectors'
import { useAppSelector } from '../../hooks'
import OnboardingStepper from '../Onboarding/component/OnboardingStepper'
import Skills from '../Onboarding/component/Skills/Skills'
import PersonalInformation from '../Onboarding/component/PersonalInformation/PersonalInformation'
import ProfessionalExperience from '../Onboarding/component/ProfessionalExperience/ProfessionalExperience'
import PersonalValues from '../Onboarding/component/PersonalValues/PersonalValues'
import MentoringStyle from '../Onboarding/component/MentoringStyle/MentoringStyle'
import Challenges from '../Onboarding/component/Challenges/Challenges'
import Interests from '../Onboarding/component/Interests/Interests'
import useBreakpoint from '../../hooks/useBreakpoint'
import { TransformedUserResponse } from '../../app/services/user/types'

const steps = [
  { title: 'Personal Information' },
  { title: 'Professional Experience' },
  { title: 'Skills and Knowledge' },
  { title: 'Personal Values' },
  { title: 'Mentoring Style' },
  { title: 'Challenges/Lessons' },
  { title: 'Interest' },
]

interface Props {
  data: TransformedUserResponse | undefined
}

const profileComponents = [PersonalInformation, ProfessionalExperience, Skills, PersonalValues, MentoringStyle, Challenges, Interests]
// 1. map profileComponents
// 2. get index from map and use title from steps : steps[index].title
// 3. make AccordionItem a function itself
// 4. adjust minHeight

// 1. do the same for desktop
function MyProfile() {
  const isMdUp = useBreakpoint('md')
  const { role } = useAppSelector(getAuth)
  const { data } = useGetUserInfoQuery({ role: role?.toLowerCase() ?? '' })
  const MyProfileComponent = isMdUp ? MyProfileDesktop : MyProfileMobile
  return (
    <Container>
      <Text fontSize="2xl" fontWeight="600"> Manage Profile </Text>
      <Text color="secondary.500" marginTop="1" marginBottom="8">
        {role === 'Mentor' ? 'Share more about yourself to connect better with your mentees!' : 'Tell us more about yourself so that your mentor can get to know you better!'}
      </Text>
      <MyProfileComponent data={data} />
    </Container>
  )
}

function MyProfileMobile(props: Props) {
  const { data } = props
  return (
    <Box>
      <Accordion allowMultiple>
        {profileComponents.map((component, index) => <AccordionItemComponent component={component} index={index} data={data} />)}
      </Accordion>
    </Box>
  )
}

function AccordionItemComponent(props: { component: any; index: number; data: any }) {
  const { component, index, data } = props
  const AccordionComponent = component
  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {steps[index].title}
              </Box>
              {isExpanded ? (
                <Icon name="remove" fontWeight="200" fontSize="28px" color={isExpanded ? 'white' : 'secondary.500'}> </Icon>
              ) : (
                <Icon name="add" fontWeight="200" fontSize="28px"> </Icon>
              )}
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <AccordionComponent
              minHeight="calc(100vh - 32rem)"
              flexDir="column"
              justify="space-between"
              data={data}
            />
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}

function MyProfileDesktop(props: Props) {
  const { data } = props
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  const handleActiveStep = (index: number) => {
    setActiveStep(index)
  }

  return (
    <Box>
      <Flex flex={['1', null, null, '0.75', null, '0.5']}>
        <Hide below="md">
          <Box margin="8">
            <OnboardingStepper activeStep={activeStep} handleActiveStep={handleActiveStep} />
          </Box>
        </Hide>

        <Box flex="1" margin="8">

          <Box>
            {activeStep === 0 && (
              <PersonalInformation
                minHeight="calc(100vh - 8rem)"
                flexDir="column"
                justify="space-between"
                data={data}
              />
            )}
          </Box>

          <Box>
            {activeStep === 1 && (
              <ProfessionalExperience
                minHeight="calc(100vh - 8rem)"
                flexDir="column"
                justify="space-between"
                data={data}
              />
            )}
          </Box>
          <Box>
            {activeStep === 2 && (
              <Skills
                minHeight="calc(100vh - 8rem)"
                flexDir="column"
                justify="space-between"
                data={data}
              />
            )}
          </Box>
          <Box>
            {activeStep === 3 && (
              <PersonalValues
                minHeight="calc(100vh - 8rem)"
                flexDir="column"
                justify="space-between"
                data={data}
              />
            )}
          </Box>
          <Box>
            {activeStep === 4 && (
              <MentoringStyle
                minHeight="calc(100vh - 8rem)"
                flexDir="column"
                justify="space-between"
                data={data}
              />
            )}
          </Box>
          <Box>
            {activeStep === 5 && (
              <Challenges
                minHeight="calc(100vh - 8rem)"
                flexDir="column"
                justify="space-between"
                data={data}
              />
            )}
          </Box>
          <Box>
            {activeStep === 6 && (
              <Interests
                minHeight="calc(100vh - 8rem)"
                flexDir="column"
                justify="space-between"
                data={data}
              />
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default MyProfile
