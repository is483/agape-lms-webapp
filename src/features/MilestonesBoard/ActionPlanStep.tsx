import {
  Badge,
  Box, Checkbox, Divider, Flex, Text,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { ActionPlan } from '../MentoringJourneys/CreateMentoringJourney/redux/types'
import { useAppSelector } from '../../hooks'
import { getAuth } from '../../app/redux/selectors'
import { useUpdateActionPlanIsDoneMutation } from '../../app/services/mentoringJourney/apiMentoringJourneySlice'

interface ActionPlanStepProps {
  actionPlanStep: ActionPlan
  index: number
  isCreated: boolean
  startDate: string | undefined
  endDate: string | undefined
}

function ActionPlanStep(props: ActionPlanStepProps) {
  const {
    actionPlanStep, index, isCreated,
    startDate, endDate,
  } = props
  const { role } = useAppSelector(getAuth)
  const { mentoringJourneyId } = useParams()
  const {
    deadline, resourcesRequired, progressIndicator,
    isDone, actionPlanStepId, byWho,
  } = actionPlanStep
  const [updateActionPlanIsDone] = useUpdateActionPlanIsDoneMutation()
  const currDatetime = new Date()
  const stepNumber = index + 1

  const handleIsDoneChange = () => {
    if (
      !isCreated || !actionPlanStepId || !mentoringJourneyId || isDone === undefined || !startDate || !endDate
      || currDatetime > new Date(endDate) || currDatetime < new Date(startDate)
    ) return
    updateActionPlanIsDone({
      actionPlanStepId,
      mentoringJourneyId,
      body: { isDone: !isDone },
    }).unwrap()
  }

  return (
    <Box>
      <Divider />
      <Badge my="2">{byWho}</Badge>
      <Flex align="start" mb="2">
        <Checkbox isChecked={isDone} m="2" mt="1" ml="0" disabled={role === 'Mentee'} onChange={handleIsDoneChange} />
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
    </Box>
  )
}

export default ActionPlanStep
