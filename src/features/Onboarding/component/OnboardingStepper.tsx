import {
  Box,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from '@chakra-ui/react'

const steps = [
  { title: 'Personal Information' },
  { title: 'Professional Experience' },
  { title: 'Skills and Knowledge' },
  { title: 'Personal Values' },
  { title: 'Mentoring Style' },
  { title: 'Challenges/Lessons' },
  { title: 'Interest' },
]

interface StepperProps {
  activeStep: number,
  handleActiveStep?: (index: number) => void
}

function OnboardingStepper(props: StepperProps) {
  const { activeStep, handleActiveStep } = props

  return (
    <Stepper index={activeStep} orientation="vertical" height="400px" gap="0" colorScheme="red">
      {steps.map((step, index) => (
        <Step key={step.title} onClick={() => handleActiveStep && handleActiveStep(index)}>
          <StepIndicator _hover={{ cursor: handleActiveStep ? 'pointer' : 'default' }}>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>
          <Box flexShrink="0" _hover={{ cursor: handleActiveStep ? 'pointer' : 'default' }}>
            <StepTitle>{step.title}</StepTitle>
          </Box>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}

OnboardingStepper.defaultProps = {
  handleActiveStep: undefined,
}

export default OnboardingStepper
