import {
  Box,
  Flex,
  Hide,
  useSteps,
} from '@chakra-ui/react'
import OnboardingStepper from './component/Stepper'
import PersonalInformation from './component/PersonalInformation/PersonalInformation'
import ProfessionalExperience from './component/ProfessionalExperience/ProfessionalExperience'
import Skills from './component/Skills/Skills'
import PersonalValues from './component/PersonalValues/PersonalValues'
import Challenges from './component/Challenges/Challenges'
import Interests from './component/Interests/Interests'
import MentoringStyle from './component/MentoringStyle/MentoringStyle'
import { useGetUserInfoQuery } from '../../app/services/user/apiUserSlice'
import { useAppSelector } from '../../hooks'
import getAuth from '../../app/redux/selectors'

const steps = [
  { title: 'Personal Information' },
  { title: 'Professional Experience' },
  { title: 'Skills and Knowledge' },
  { title: 'Personal Values' },
  { title: 'Mentoring Style' },
  { title: 'Challenges/Lessons' },
  { title: 'Interest' },
]

function Onboarding() {
  const { role } = useAppSelector(getAuth)
  const { data } = useGetUserInfoQuery({ role: role?.toLowerCase() ?? '' })
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
      <Box margin="8">
        <Hide below="md">
          <OnboardingStepper activeStep={activeStep} handleActiveStep={handleActiveStep} />
        </Hide>
      </Box>

      <Box flex="1" margin="8" marginLeft="20">
        <Box>
          {activeStep === 0 && (
            <PersonalInformation
              handleNext={handleNext}
              data={data}
            />
          )}
          {activeStep === 1 && (
            <ProfessionalExperience
              handleBack={handleBack}
              handleNext={handleNext}
              data={data}
            />
          )}
          {activeStep === 2 && (
            <Skills
              handleBack={handleBack}
              handleNext={handleNext}
              data={data}
            />
          )}
          {activeStep === 3 && (
            <PersonalValues
              handleBack={handleBack}
              handleNext={handleNext}
              data={data}
            />
          )}
          {activeStep === 4 && (
            <MentoringStyle
              handleBack={handleBack}
              handleNext={handleNext}
              data={data}
            />
          )}
          {activeStep === 5 && (
            <Challenges
              handleBack={handleBack}
              handleNext={handleNext}
              data={data}
            />
          )}
          {activeStep === 6 && (
            <Interests
              handleBack={handleBack}
              handleNext={handleNext}
              data={data}
            />
          )}
        </Box>
      </Box>
    </Flex>

  )
}
export default Onboarding
