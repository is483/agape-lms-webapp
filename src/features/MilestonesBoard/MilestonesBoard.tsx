import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box, Button, Checkbox, Flex, Menu, MenuButton, MenuItem, MenuList, Progress, Text,
} from '@chakra-ui/react'
import { Icon } from '../../components'
import { ActionPlan, Goal, Milestone } from '../MentoringJourneys/CreateMentoringJourney/redux/types'
import { MILESTONES } from '../MentoringJourneys/CreateMentoringJourney/redux/constants'

interface MilestonesBoardProps {
  data: Milestone[]
  startDate: string
  isEditable: boolean
}

const formatDate = (date: Date) => date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

function MilestonesBoard(props: MilestonesBoardProps) {
  const { data, startDate, isEditable } = props
  return (
    <Box background="blue.50" rounded="md" minHeight="60vh">
      {data.map((milestone, index) => {
        // 60 days per milestone
        const fromDate = new Date(startDate)
        fromDate.setDate(fromDate.getDate() + index * 60)
        const toDate = new Date(startDate)
        toDate.setDate(toDate.getDate() + (index + 1) * 60)
        const dateStr = `${formatDate(fromDate)} - ${formatDate(toDate)} `
        return (
          <MilestoneCard milestone={milestone} index={index} dateStr={dateStr} isEditable={isEditable} />
        )
      })}
    </Box>
  )
}

interface MilestoneCardProps {
  milestone: Milestone
  index: number
  dateStr: string
  isEditable: boolean
}

function MilestoneCard(props: MilestoneCardProps) {
  const {
    milestone, index, dateStr, isEditable,
  } = props
  const { step, goals } = milestone

  return (
    <Box maxWidth="100%" width="360px">
      <Flex flexDir="column" gap="4" m="4" pt="4">
        <Box background="blue.600" p="2" rounded="md" shadow="sm">
          <Flex justify="space-between">
            <Text color="white" fontSize="xs" fontWeight="bold">
              Milestone {step}
            </Text>
            <Icon name="info" color="white" fontSize="xl" _hover={{ cursor: 'pointer' }} />
          </Flex>
          <Text color="white" fontSize="sm">
            {MILESTONES[index].title}
          </Text>
          <Text color="white" fontSize="xs">
            <Icon name="calendar_today" color="white" fontSize="16px" top="3px" position="relative" me="1" />
            {dateStr}
          </Text>
        </Box>
        {goals.map((goal, index) => (<GoalCard goal={goal} index={index} />))}
        <Button size="xs" variant="ghost" color="gray.500" w="min-content">+ New Goal</Button>
      </Flex>
    </Box>
  )
}

interface GoalProps {
  goal: Goal
  index: number
  isEditable: boolean
}

function GoalCard(props: GoalProps) {
  const { goal, index, isEditable } = props
  const {
    title, measurableObjective, deadline, actionPlans,
  } = goal

  return (
    <Box p="2" background="white" rounded="md" shadow="sm">
      <Flex justify="space-between">
        <Text fontSize="xs" fontWeight="600" color="red.800">Goal {index + 1}</Text>
        <Menu>
          <MenuButton>
            <Icon name="more_horiz" fontSize="xl" color="black" _hover={{ cursor: 'pointer' }} />
          </MenuButton>
          <MenuList>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Delete</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Text fontSize="sm">{title}</Text>
      <Flex justify="space-between" mt="1">
        <Text fontSize="sm" color="gray.500" fontWeight="bold" mb="1">Progress</Text>
        <Text fontSize="sm" color="gray.700">0/2</Text>
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
            {actionPlans.map((actionPlanStep, index) => (<ActionPlanStep actionPlanStep={actionPlanStep} index={index} />))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

interface ActionPlanStepProps {
  actionPlanStep: ActionPlan
  index: number
}

function ActionPlanStep(props: ActionPlanStepProps) {
  const { actionPlanStep, index } = props
  const {
    deadline, resourcesRequired, progressIndicator, byWho,
  } = actionPlanStep

  return (
    <Flex align="start" mb="2">
      <Checkbox m="2" mt="1" ml="0" />
      <Box>
        <Flex justify="space-between" mb="1">
          <Text fontSize="sm" fontWeight="bold" textTransform="uppercase">Step 1</Text>
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

export default MilestonesBoard
