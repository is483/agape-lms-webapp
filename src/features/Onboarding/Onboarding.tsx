import {
  Box,
  Flex,
  Hide,
  useSteps,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import OnboardingStepper from './component/OnboardingStepper'
import PersonalInformation from './component/PersonalInformation/PersonalInformation'
import ProfessionalExperience from './component/ProfessionalExperience/ProfessionalExperience'
import Skills from './component/Skills/Skills'
import PersonalValues from './component/PersonalValues/PersonalValues'
import Challenges from './component/Challenges/Challenges'
import Interests from './component/Interests/Interests'
import MentoringStyle from './component/MentoringStyle/MentoringStyle'
import { useGetUserInfoQuery } from '../../app/services/user/apiUserSlice'
import { useAppSelector } from '../../hooks'
import { getAuth } from '../../app/redux/selectors'

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
  const { step } = useParams()

  useEffect(() => {
    if (step?.toLowerCase() !== 'introduction') return
    setActiveStep(Number(step) - 1)
  }, [setActiveStep, step])

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
    <Flex flex={['1', null, '0.5']}>
      <Hide below="md">
        <Box margin="8">
          <OnboardingStepper activeStep={activeStep} />
        </Box>
      </Hide>
      <Box flex="1" margin="8">
        <Box>
          {activeStep === 0 && (
            <PersonalInformation
              minHeight="calc(100vh - 8rem)"
              flexDir="column"
              justify="space-between"
              handleNext={handleNext}
              data={data}
            />
          )}
          {activeStep === 1 && (
            <ProfessionalExperience
              minHeight="calc(100vh - 8rem)"
              flexDir="column"
              justify="space-between"
              handleBack={handleBack}
              handleNext={handleNext}
              data={data}
            />
          )}
          {activeStep === 2 && (
            <Skills
              minHeight="calc(100vh - 8rem)"
              flexDir="column"
              justify="space-between"
              handleBack={handleBack}
              handleNext={handleNext}
              data={data}
            />
          )}
          {activeStep === 3 && (
            <PersonalValues
              minHeight="calc(100vh - 8rem)"
              flexDir="column"
              justify="space-between"
              handleBack={handleBack}
              handleNext={handleNext}
              data={data}
            />
          )}
          {activeStep === 4 && (
            <MentoringStyle
              minHeight="calc(100vh - 8rem)"
              flexDir="column"
              justify="space-between"
              handleBack={handleBack}
              handleNext={handleNext}
              data={data}
            />
          )}
          {activeStep === 5 && (
            <Challenges
              minHeight="calc(100vh - 8rem)"
              flexDir="column"
              justify="space-between"
              handleBack={handleBack}
              handleNext={handleNext}
              data={data}
            />
          )}
          {activeStep === 6 && (
            <Interests
              minHeight="calc(100vh - 8rem)"
              flexDir="column"
              justify="space-between"
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
