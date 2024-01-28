/* eslint-disable no-param-reassign */
import {
  Button, Card, CardBody, CardHeader,
  Flex, Heading, Modal, ModalCloseButton,
  ModalContent, ModalOverlay, Progress, Tag,
  Text,
} from '@chakra-ui/react'
import { useImmer } from 'use-immer'
import { ChangeEvent } from 'react'
import { ControlledSelect, ControlledTextInput, Icon } from '../../../components'
import { clearErrors } from '../../../utils'

interface GoalFormModalProps {
  isModalOpen: boolean
  onModalClose: () => void
  milestoneIndex: number
}

const defaultActionPlanStep = {
  byWho: { value: '', error: '' },
  deadline: { value: '', error: '' },
  resourcesRequired: { value: '', error: '' },
  progressIndicator: { value: '', error: '' },
}

const defaultGoal = {
  title: { value: '', error: '' },
  measurableObjective: { value: '', error: '' },
  deadline: { value: '', error: '' },
  actionPlans: [{ ...defaultActionPlanStep }],
}

const mentees: string[] = ['1', '2']

function GoalFormModal(props: GoalFormModalProps) {
  const { isModalOpen, onModalClose, milestoneIndex } = props
  const [goal, updateGoal] = useImmer(defaultGoal)
  const {
    title, measurableObjective, deadline, actionPlans,
  } = goal

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateGoal((draft) => {
      draft.title.value = e.target.value
    })
  }

  const handleMeasurableObjectiveChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateGoal((draft) => {
      draft.measurableObjective.value = e.target.value
    })
  }

  const handleDeadlineChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateGoal((draft) => {
      draft.deadline.value = e.target.value
    })
  }

  const addActionPlan = () => {
    updateGoal((draft) => {
      draft.actionPlans.push({ ...defaultActionPlanStep })
    })
  }

  const removeActionPlan = (index: number) => {
    updateGoal((draft) => {
      draft.actionPlans.splice(index, 1)
    })
  }

  const handleByWhoChange = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    updateGoal((draft) => {
      draft.actionPlans[index].byWho.value = e.target.value
    })
  }

  const handleStepDeadlineChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    updateGoal((draft) => {
      draft.actionPlans[index].deadline.value = e.target.value
    })
  }

  const handleResourceRequiredChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    updateGoal((draft) => {
      draft.actionPlans[index].resourcesRequired.value = e.target.value
    })
  }

  const handleProgressIndicatorChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    updateGoal((draft) => {
      draft.actionPlans[index].progressIndicator.value = e.target.value
    })
  }

  const handleModalCancel = () => {
    // TODO: Clear form state
    onModalClose()
  }

  const handleCreate = () => {
    let hasErrors: boolean = false
    updateGoal((draft) => {
      const { title, deadline, measurableObjective } = draft
      clearErrors(draft)

      if (!title.value.trim()) {
        title.error = 'Goal is required'
        hasErrors = true
      }
      if (!deadline.value) {
        deadline.error = 'Deadline is required'
        hasErrors = true
      }
      if (!measurableObjective.value) {
        measurableObjective.error = 'Deadline is required'
        hasErrors = true
      }

      draft.actionPlans.forEach(({
        byWho, deadline, progressIndicator, resourcesRequired,
      }) => {
        if (!byWho.value) {
          byWho.error = 'By who is required'
          hasErrors = true
        }
        if (!deadline.value) {
          deadline.error = 'Deadline is required'
          hasErrors = true
        }
        if (!progressIndicator.value) {
          progressIndicator.error = 'Progress indicator is required'
          hasErrors = true
        }
        if (!resourcesRequired.value) {
          resourcesRequired.error = 'Resources required is required'
          hasErrors = true
        }
      })
    })
    if (hasErrors) return

    // TODO: Save to form slice state
    onModalClose()
  }

  return (
    <Modal size="3xl" isOpen={isModalOpen} onClose={handleModalCancel} isCentered>
      <ModalOverlay />
      <ModalContent p="4" m="4" overflowY="auto" maxHeight="90vh">
        <Text textTransform="uppercase" fontWeight="600" fontSize="md">Setting a goal</Text>
        <ModalCloseButton />
        <Flex flexDir="column" mt="12" gap="12">
          <ControlledTextInput
            label="Goal"
            error={title.error}
            type="text"
            inputProps={{ onChange: handleTitleChange, value: title.value }}
          />
          <ControlledTextInput
            label="Measurable Objective"
            error={measurableObjective.error}
            type="text"
            inputProps={{ onChange: handleMeasurableObjectiveChange, value: measurableObjective.value }}
          />
          <ControlledTextInput
            label="Deadline"
            placeholder="Select a date"
            error={deadline.error}
            type="date"
            inputProps={{ onChange: handleDeadlineChange, value: deadline.value }}
          />
        </Flex>
        <Text textTransform="uppercase" mt="4" fontSize="xs" fontWeight="600">Action Plan</Text>
        <Flex justify="space-between" align="center" gap="4">
          <Progress width="100%" colorScheme="red" value={0} />
          <Tag variant="solid" colorScheme="red">
            0/{goal.actionPlans.length}
          </Tag>
        </Flex>
        {actionPlans.map((actionPlanStep, index) => (
          <ActionPlanStepForm
            handleByWhoChange={handleByWhoChange}
            handleStepDeadlineChange={handleStepDeadlineChange}
            handleResourceRequiredChange={handleResourceRequiredChange}
            handleProgressIndicatorChange={handleProgressIndicatorChange}
            removeActionPlan={removeActionPlan}
            index={index}
            actionPlanStep={actionPlanStep}
            showRemoveIcon={actionPlans.length > 1}
          />
        ))}
        <Button onClick={addActionPlan} size="sm" mt="4" variant="ghost" colorScheme="red" width="fit-content">+ Add Step</Button>
        <Flex gap="4" justify="flex-end" mt="8">
          <Button colorScheme="red" size="sm" variant="outline" onClick={handleModalCancel}>Cancel</Button>
          <Button colorScheme="red" size="sm" onClick={handleCreate}>Create</Button>
        </Flex>
      </ModalContent>
    </Modal>
  )
}

interface ActionPlanStepFormProps {
  handleByWhoChange: (e: ChangeEvent<HTMLSelectElement>, index: number) => void
  handleStepDeadlineChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void
  handleResourceRequiredChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void
  handleProgressIndicatorChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void
  removeActionPlan: (index: number) => void
  index: number
  actionPlanStep: typeof defaultActionPlanStep
  showRemoveIcon: boolean
}

function ActionPlanStepForm(props: ActionPlanStepFormProps) {
  const {
    handleByWhoChange, handleStepDeadlineChange,
    handleResourceRequiredChange, handleProgressIndicatorChange,
    index, actionPlanStep, removeActionPlan,
    showRemoveIcon,
  } = props

  const {
    byWho, deadline, resourcesRequired, progressIndicator,
  } = actionPlanStep

  const updateByWho = (e: ChangeEvent<HTMLSelectElement>) => handleByWhoChange(e, index)
  const updateStepDeadline = (e: ChangeEvent<HTMLInputElement>) => handleStepDeadlineChange(e, index)
  const updateResourcesRequired = (e: ChangeEvent<HTMLInputElement>) => handleResourceRequiredChange(e, index)
  const updateProgressIndicator = (e: ChangeEvent<HTMLInputElement>) => handleProgressIndicatorChange(e, index)

  return (
    <Card mt="4">
      <CardHeader>
        <Flex justify="space-between">
          <Heading size="sm" fontWeight="600">Step {index + 1}</Heading>
          {showRemoveIcon && <Icon onClick={() => removeActionPlan(index)} as="button" name="close" />}
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex flexDir="column" gap="12">
          <Flex gap={['10', null, '4']} flexDir={['column', null, 'row']}>
            <ControlledSelect
              label="By Who"
              error={byWho.error}
              options={mentees}
              boxProps={{ flex: '1' }}
              selectProps={{ onChange: updateByWho, value: byWho.value }}
            />
            <ControlledTextInput
              label="Deadline"
              placeholder="Select a date"
              error={deadline.error}
              type="date"
              boxProps={{ flex: '1' }}
              inputProps={{ onChange: updateStepDeadline, value: deadline.value }}
            />
          </Flex>
          <ControlledTextInput
            label="Resources Required"
            placeholder="How can we help you achieve your goal?"
            error={resourcesRequired.error}
            type="text"
            inputProps={{ onChange: updateResourcesRequired, value: resourcesRequired.value }}
          />
          <ControlledTextInput
            label="Progress Indicator"
            placeholder="What does success look like?"
            error={progressIndicator.error}
            type="text"
            inputProps={{ onChange: updateProgressIndicator, value: progressIndicator.value }}
          />
        </Flex>

      </CardBody>
    </Card>
  )
}

export default GoalFormModal
