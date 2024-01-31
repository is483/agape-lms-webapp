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
  { title: 'Personal Information', icon: 'person' },
  { title: 'Professional Experience', icon: 'work' },
  { title: 'Skills and Knowledge', icon: 'book_5' },
  { title: 'Personal Values', icon: 'mood' },
  { title: 'Mentoring Style', icon: 'diversity_3' },
  { title: 'Challenges/Lessons', icon: 'school' },
  { title: 'Interest', icon: 'interests' },
]

interface Props {
  data: TransformedUserResponse | undefined
}

const profileComponents = [PersonalInformation, ProfessionalExperience, Skills, PersonalValues, MentoringStyle, Challenges, Interests]

function MyProfile() {
  const isMdUp = useBreakpoint('md')
  const { role } = useAppSelector(getAuth)
  const { data } = useGetUserInfoQuery({ role: role?.toLowerCase() ?? '' })
  const MyProfileComponent = isMdUp ? MyProfileDesktop : MyProfileMobile
  return (
    <Container minHeight="calc(100vh - 16px - 48px - 16px)">
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

function AccordionItemComponent(props: { component: any; index: number; data: TransformedUserResponse | undefined }) {
  const { component, index, data } = props
  const AccordionComponent = component
  return (
    <AccordionItem>
      {({ isExpanded }) => {
        const bgColor = isExpanded ? 'primary.800' : 'white'
        const textColor = isExpanded ? 'white' : 'black'
        return (
          <>
            <AccordionButton paddingY="4" background={bgColor} _hover={{ background: bgColor }} color={textColor}>
              <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                <Icon name={steps[index].icon} fontWeight="200" fontSize="24px" color={isExpanded ? 'white' : 'gray.600'} marginRight="4" padding="1" rounded="full" />
                {steps[index].title}
              </Box>
              {isExpanded ? (
                <Icon name="remove" fontWeight="200" fontSize="28px" color="white" />
              ) : (
                <Icon name="add" fontWeight="200" fontSize="28px" />
              )}
            </AccordionButton>
            <AccordionPanel pb={4}>
              <AccordionComponent
                minHeight="calc(100vh - 32rem)"
                flexDir="column"
                justify="space-between"
                data={data}
              />
            </AccordionPanel>
          </>
        )
      }}
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
          {profileComponents.map((component, index) => {
            const ProfileComponent = component
            return index === activeStep && (
              <ProfileComponent
                minHeight="calc(100vh - 16rem)"
                flexDir="column"
                justify="space-between"
                data={data}
              />
            )
          })}
        </Box>
      </Flex>
    </Box>
  )
}

export default MyProfile
