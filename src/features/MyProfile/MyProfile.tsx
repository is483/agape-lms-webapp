import {
  Box, useSteps, Hide, Flex,
} from '@chakra-ui/react'
import Container from '../../components/Container'
import { useGetUserInfoQuery } from '../../app/services/user/apiUserSlice'
import { getAuth } from '../../app/redux/selectors'
import { useAppSelector } from '../../hooks'
import OnboardingStepper from '../Onboarding/component/OnboardingStepper'
import Skills from '../Onboarding/component/Skills/Skills'

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
      <Flex flex={['1', null, null, '0.75', null, '0.5']}>

        <Hide below="md">
          <Box margin="8">
            <OnboardingStepper activeStep={activeStep} handleActiveStep={handleActiveStep} />
          </Box>
        </Hide>

        <Box flex="1" margin="8">

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
        </Box>
      </Flex>
    </Container>
  )
}

export default MyProfile
