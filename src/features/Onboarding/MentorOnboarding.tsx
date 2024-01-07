import {
  Box,
  Flex,
  useSteps,
} from '@chakra-ui/react'
import OnboardingStepper from './component/Introduction/Stepper'

const steps = [
  { title: 'Personal Information' },
  { title: 'Professional Experience' },
  { title: 'Skills and Knowledge' },
  { title: 'Personal Values' },
  { title: 'Mentoring Style' },
  { title: 'Challenges/Lessons' },
  { title: 'Interest' },
]

function MentorOnboarding() {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  const handleActiveStep = (index: number) => {
    setActiveStep(index)
  }

  // const handleBack = () => {
  //   if (activeStep > 1) {
  //     setActiveStep(activeStep - 1)
  //   }
  // }

  return (
    <Flex>
      <Box>
        <OnboardingStepper activeStep={activeStep} handleActiveStep={handleActiveStep} />
      </Box>

      <Box flex="1">
        <Box>
          {activeStep === 0 && <>1</>}
          {activeStep === 1 && <>2</>}
          {activeStep === 2 && <>3</>}

        </Box>
      </Box>

    </Flex>

  )
}
export default MentorOnboarding
