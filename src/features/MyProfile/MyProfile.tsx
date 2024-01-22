import {
  Box, useSteps, Hide, Flex, Text,
} from '@chakra-ui/react'
import Container from '../../components/Container'
import { useGetUserInfoQuery } from '../../app/services/user/apiUserSlice'
import { getAuth } from '../../app/redux/selectors'
import { useAppSelector } from '../../hooks'
import OnboardingStepper from '../Onboarding/component/OnboardingStepper'
import Skills from '../Onboarding/component/Skills/Skills'
import PersonalInformation from '../Onboarding/component/PersonalInformation/PersonalInformation'
import ProfessionalExperience from '../Onboarding/component/ProfessionalExperience/ProfessionalExperience'
import PersonalValues from '../Onboarding/component/PersonalValues/PersonalValues'
import MentoringStyle from '../Onboarding/component/MentoringStyle/MentoringStyle'

const steps = [
  { title: 'Personal Information' },
  { title: 'Professional Experience' },
  { title: 'Skills and Knowledge' },
  { title: 'Personal Values' },
  { title: 'Mentoring Style' },
  { title: 'Challenges/Lessons' },
  { title: 'Interest' },
]

function MyProfile() {
  const { role } = useAppSelector(getAuth)
  const { data } = useGetUserInfoQuery({ role: role?.toLowerCase() ?? '' })
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  const handleActiveStep = (index: number) => {
    setActiveStep(index)
  }

  return (
    <Container>
      <Text fontSize="2xl" fontWeight="600"> Manage Profile </Text>
      <Text color="secondary.500" marginTop="1" marginBottom="8">
        {role === 'Mentor' ? 'Share more about yourself to connect better with your mentees!' : 'Tell us more about yourself so that your mentor can get to know you better!'}
      </Text>
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
        </Box>
      </Flex>
    </Container>
  )
}

export default MyProfile
