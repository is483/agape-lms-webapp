import {
  Box,
  Flex,
  Hide,
  useSteps,
} from '@chakra-ui/react'
import OnboardingStepper from './component/Stepper'
import PersonalInformation from './component/PersonalInformation/PersonalInformation'

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

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const handleNext = () => {
    if (activeStep < 6) {
      setActiveStep(activeStep + 1)
    }
  }
  return (
    <Flex>
      <Box>
        <Hide below="md">
          <OnboardingStepper activeStep={activeStep} handleActiveStep={handleActiveStep} />
        </Hide>
      </Box>

      <Box flex="1" margin="8" marginLeft="20">
        <Box>
          {activeStep === 0 && (
            <PersonalInformation
              handleBack={handleBack}
              handleNext={handleNext}
            />
          )}
          {activeStep === 1 && <>2</>}
          {activeStep === 2 && <>3</>}
        </Box>
      </Box>
    </Flex>

  )
}
export default MentorOnboarding
