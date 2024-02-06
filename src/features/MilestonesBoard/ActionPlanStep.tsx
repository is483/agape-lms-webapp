import {
  Box, Checkbox, Flex, Text,
} from '@chakra-ui/react'
import { ActionPlan } from '../MentoringJourneys/CreateMentoringJourney/redux/types'
import { useAppSelector } from '../../hooks'
import { getAuth } from '../../app/redux/selectors'

interface ActionPlanStepProps {
  actionPlanStep: ActionPlan
  index: number
}

function ActionPlanStep(props: ActionPlanStepProps) {
  const { role } = useAppSelector(getAuth)
  const { actionPlanStep, index } = props
  const {
    deadline, resourcesRequired, progressIndicator, byWho,
  } = actionPlanStep

  const stepNumber = index + 1
  // TODO: Add by who indicator

  return (
    <Flex align="start" mb="2">
      <Checkbox m="2" mt="1" ml="0" disabled={role === 'Mentee'} />
      <Box flexGrow="1" px="1">
        <Flex justify="space-between" mb="1">
          <Text fontSize="sm" fontWeight="bold" textTransform="uppercase">Step {stepNumber}</Text>
          <Text fontSize="sm" color="gray.500">{deadline}</Text>
        </Flex>
        <Text fontSize="xs" fontWeight="500" textTransform="uppercase">Resources Required</Text>
        <Text fontSize="sm" mb="2" color="gray.500">
          {resourcesRequired}
        </Text>
        <Text fontSize="xs" fontWeight="500" textTransform="uppercase">Progress Indicator Required</Text>
        <Text fontSize="sm" mb="2" color="gray.500">
          {progressIndicator}
        </Text>
      </Box>
    </Flex>
  )
}

export default ActionPlanStep