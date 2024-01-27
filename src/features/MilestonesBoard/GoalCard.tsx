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

export default GoalCard
