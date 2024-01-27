import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Modal, ModalCloseButton, ModalContent,
  ModalOverlay, Progress, Tag, Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ControlledSelect, ControlledTextInput } from '../../../components'
import { Goal } from '../../MentoringJourneys/CreateMentoringJourney/redux/types'

interface GoalFormModalProps {
  isModalOpen: boolean
  onModalClose: () => void
  milestoneIndex: number
}

const goals: string[] = ['1', '2', '3']

const defaultGoal: Goal = {
  title: '',
  measurableObjective: '',
  deadline: '',
  actionPlans: [{
    byWho: '',
    deadline: '',
    resourcesRequired: '',
    progressIndicator: '',
  }],
}

function GoalFormModal(props: GoalFormModalProps) {
  const { isModalOpen, onModalClose, milestoneIndex } = props
  const [goal, setGoal] = useState<Goal>(defaultGoal)

  return (
    <Modal size="3xl" isOpen={isModalOpen} onClose={onModalClose} isCentered>
      <ModalOverlay />
      <ModalContent p="4" m="4" overflowY="auto" maxHeight="90vh">
        <Text textTransform="uppercase" fontWeight="600" fontSize="md">Setting a goal</Text>
        <ModalCloseButton />
        <Flex flexDir="column" mt="12" gap="10">
          <ControlledSelect label="Goal" error="" options={goals} />
          <ControlledTextInput label="Measurable Objective" error="" type="text" />
          <ControlledTextInput label="Deadline" placeholder="Select a date" error="" type="date" />
        </Flex>
        <Text textTransform="uppercase" mt="4" fontSize="xs" fontWeight="600">Action Plan</Text>
        <Flex justify="space-between" align="center" gap="4">
          <Progress width="100%" colorScheme="red" value={0} />
          <Tag variant="solid" colorScheme="red">
            0/{goal.actionPlans.length}
          </Tag>
        </Flex>
        <Card mt="4">
          <CardHeader>
            <Heading size="sm" fontWeight="600">Step 1</Heading>
          </CardHeader>
          <CardBody>
            <Flex flexDir="column" gap="10">
              <Flex gap="4">
                <ControlledSelect label="By Who" error="" options={goals} boxProps={{ flex: '1' }} />
                <ControlledTextInput label="Deadline" placeholder="Select a date" error="" type="date" boxProps={{ flex: '1' }} />
              </Flex>
              <ControlledTextInput label="Resources Required" placeholder="How can we help you achieve your goal?" error="" type="text" />
              <ControlledTextInput label="Progress Indicator" placeholder="What does success look like?" error="" type="text" />
            </Flex>
          </CardBody>
        </Card>
        <Button size="sm" mt="4" variant="ghost" colorScheme="red" width="fit-content">+ Add Step</Button>
        <Flex gap="4" justify="flex-end" mt="8">
          <Button colorScheme="red" size="sm" variant="outline">Cancel</Button>
          <Button colorScheme="red" size="sm">Create</Button>
        </Flex>
      </ModalContent>
    </Modal>
  )
}

export default GoalFormModal
