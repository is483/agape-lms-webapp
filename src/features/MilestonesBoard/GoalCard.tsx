import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box, Flex, Menu, MenuButton, MenuItem, MenuList, Progress, Text,
} from '@chakra-ui/react'
import { Goal } from '../MentoringJourneys/CreateMentoringJourney/redux/types'
import { Icon } from '../../components'
import ActionPlanStep from './ActionPlanStep'
import { useAppDispatch } from '../../hooks'
import { deleteGoal } from '../MentoringJourneys/CreateMentoringJourney/redux/mentoringJourneyFormSlice'

interface GoalProps {
  goal: Goal
  milestoneIndex: number
  goalIndex: number
  isEditable: boolean
  handleOpenFormModal: (milestoneIndex: number, goalIndex?: number) => void
}

function GoalCard(props: GoalProps) {
  const {
    goal, milestoneIndex, goalIndex, isEditable,
    handleOpenFormModal,
  } = props
  const dispatch = useAppDispatch()
  const {
    goalName, deadline, actionPlans,
  } = goal

  const handleDeleteGoal = () => {
    dispatch(deleteGoal({ milestoneIndex, goalIndex }))
  }

  return (
    <Box p="2" background="white" rounded="md" shadow="sm">
      <Flex justify="space-between">
        <Text fontSize="xs" fontWeight="600" color="red.800">Goal {goalIndex + 1}</Text>
        {isEditable && (
          <Menu>
            <MenuButton>
              <Icon name="more_horiz" fontSize="xl" color="black" _hover={{ cursor: 'pointer' }} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleOpenFormModal(milestoneIndex, goalIndex)}>Edit</MenuItem>
              <MenuItem onClick={handleDeleteGoal}>Delete</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
      <Text fontSize="sm">{goalName}</Text>
      <Flex justify="space-between" mt="1">
        <Text fontSize="sm" color="gray.500" fontWeight="bold" mb="1">Progress</Text>
        <Text fontSize="sm" color="gray.700">0/{goal.actionPlans.length}</Text>
      </Flex>
      <Progress value={0} rounded="sm" />
      <Flex mt="2" gap="1" align="center">
        <Text fontSize="sm" color="gray.500" fontWeight="bold">Deadline:</Text>
        <Text fontSize="xs" color="gray.700">{deadline}</Text>
      </Flex>
      <Accordion allowToggle>
        <AccordionItem as="span">
          <AccordionButton px="0" pb="0">
            <Text color="red.700" fontSize="xs" fontWeight="bold" textTransform="uppercase">View Action Plan ({actionPlans.length})</Text>
            <AccordionIcon color="red.700" />
          </AccordionButton>
          <AccordionPanel p="0" pt="2">
            {actionPlans.map((actionPlanStep, index) => (
              <ActionPlanStep actionPlanStep={actionPlanStep} index={index} />
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

export default GoalCard
