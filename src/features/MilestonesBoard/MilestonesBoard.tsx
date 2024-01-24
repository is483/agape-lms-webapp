import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box, Button, Checkbox, Flex, Menu, MenuButton, MenuItem, MenuList, Progress, Text,
} from '@chakra-ui/react'
import { Icon } from '../../components'

function MilestonesBoard() {
  return (
    <Box background="blue.50" rounded="md" minHeight="60vh">
      <MilestoneCard />
    </Box>
  )
}

function MilestoneCard() {
  return (
    <Box maxWidth="100%" width="360px">
      <Flex flexDir="column" gap="4" m="4" pt="4">
        <Box background="blue.600" p="2" rounded="md" shadow="sm">
          <Flex justify="space-between">
            <Text color="white" fontSize="xs" fontWeight="bold">
              Milestone 1
            </Text>
            <Icon name="info" color="white" fontSize="xl" _hover={{ cursor: 'pointer' }} />
          </Flex>
          <Text color="white" fontSize="sm">
            Building Foundations
          </Text>
          <Text color="white" fontSize="xs">
            <Icon name="calendar_today" color="white" fontSize="16px" top="3px" position="relative" me="1" />
            1 January 2023 - 30 March 2023
          </Text>
        </Box>
        <GoalCard />
        <Button size="xs" variant="ghost" color="gray.500" w="min-content">+ New Goal</Button>
      </Flex>
    </Box>
  )
}

function GoalCard() {
  return (
    <Box p="2" background="white" rounded="md" shadow="sm">
      <Flex justify="space-between">
        <Text fontSize="xs" fontWeight="600" color="red.800">Goal 1</Text>
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
      <Text fontSize="sm">Be commited to this mentoring journey</Text>
      <Flex justify="space-between" mt="1">
        <Text fontSize="sm" color="gray.500" fontWeight="bold" mb="1">Progress</Text>
        <Text fontSize="sm" color="gray.700">0/2</Text>
      </Flex>
      <Progress value={0} rounded="sm" />
      <Accordion allowToggle>
        <AccordionItem as="span">
          <AccordionButton px="0" pb="0">
            <Text color="red.700" fontSize="xs" fontWeight="bold" textTransform="uppercase">View Action Plan (2)</Text>
            <AccordionIcon color="red.700" />
          </AccordionButton>
          <AccordionPanel p="0" pt="2">
            <ActionPlanStep />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

function ActionPlanStep() {
  return (
    <Flex align="start" mb="2">
      <Checkbox m="2" mt="1" ml="0" />
      <Box>
        <Flex justify="space-between" mb="1">
          <Text fontSize="sm" fontWeight="bold" textTransform="uppercase">Step 1</Text>
          <Text fontSize="sm" color="gray.500">5 January 2024</Text>
        </Flex>
        <Text fontSize="xs" fontWeight="500" textTransform="uppercase">Resources Required</Text>
        <Text fontSize="sm" mb="2" color="gray.500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        </Text>
        <Text fontSize="xs" fontWeight="500" textTransform="uppercase">Progress Indicator Required</Text>
        <Text fontSize="sm" mb="2" color="gray.500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        </Text>
      </Box>
    </Flex>
  )
}

export default MilestonesBoard
