/* eslint-disable no-param-reassign */
import {
  Button, Card, CardBody, CardHeader,
  Flex, Heading, Modal, ModalCloseButton,
  ModalContent, ModalOverlay, Progress, Tag,
  Text,
} from '@chakra-ui/react'
import { useImmer } from 'use-immer'
import { ChangeEvent, useEffect } from 'react'
import { ControlledSelect, ControlledTextInput, Icon } from '../../../components'
import { clearErrors } from '../../../utils'
import { Goal } from '../../MentoringJourneys/CreateMentoringJourney/redux/types'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { addGoal, editGoal } from '../../MentoringJourneys/CreateMentoringJourney/redux/mentoringJourneyFormSlice'
import { useGetUserInfoQuery } from '../../../app/services/user/apiUserSlice'
import { getAuth } from '../../../app/redux/selectors'
import { getBasicDetails, getMilestones } from '../../MentoringJourneys/CreateMentoringJourney/redux/selectors'

interface GoalFormModalProps {
  isModalOpen: boolean
  onModalClose: () => void
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

function GoalFormModal(props: GoalFormModalProps) {
  const { isModalOpen, onModalClose } = props
  const dispatch = useAppDispatch()
  const [goal, updateGoal] = useImmer(defaultGoal)
  const {
    title, measurableObjective, deadline, actionPlans,
  } = goal
  const { milestones, milestoneIndex, goalIndex } = useAppSelector(getMilestones)
  const goalInfo = milestones[milestoneIndex].goals[goalIndex ?? 0]
  const isEditing = goalIndex !== undefined

  useEffect(() => {
    if (!isEditing) return
    updateGoal((draft) => {
      draft.title.value = goalInfo.title
      draft.deadline.value = goalInfo.deadline
      draft.measurableObjective.value = goalInfo.measurableObjective
      draft.actionPlans = []
      goalInfo.actionPlans.forEach((actionPlan) => {
        draft.actionPlans.push({
          byWho: { value: actionPlan.byWho, error: '' },
          deadline: { value: actionPlan.deadline, error: '' },
          resourcesRequired: { value: actionPlan.resourcesRequired, error: '' },
          progressIndicator: { value: actionPlan.progressIndicator, error: '' },
        })
      })
    })
  }, [goalIndex, goalInfo, isEditing, updateGoal])

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateGoal((draft) => { draft.title.value = e.target.value })
  }

  const handleMeasurableObjectiveChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateGoal((draft) => { draft.measurableObjective.value = e.target.value })
  }

  const handleDeadlineChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateGoal((draft) => { draft.deadline.value = e.target.value })
  }

  const addActionPlan = () => {
    updateGoal((draft) => { draft.actionPlans.push({ ...defaultActionPlanStep }) })
  }

  const removeActionPlan = (index: number) => {
    updateGoal((draft) => { draft.actionPlans.splice(index, 1) })
  }

  const handleByWhoChange = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    updateGoal((draft) => { draft.actionPlans[index].byWho.value = e.target.value })
  }

  const handleStepDeadlineChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    updateGoal((draft) => { draft.actionPlans[index].deadline.value = e.target.value })
  }

  const handleResourceRequiredChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    updateGoal((draft) => { draft.actionPlans[index].resourcesRequired.value = e.target.value })
  }

  const handleProgressIndicatorChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    updateGoal((draft) => { draft.actionPlans[index].progressIndicator.value = e.target.value })
  }

  const handleModalCancel = () => {
    onModalClose()
    updateGoal({
      ...defaultGoal,
      actionPlans: [{ ...defaultActionPlanStep }],
    })
  }

  const handleCreate = () => {
    let hasErrors: boolean = false

    updateGoal((draft) => clearErrors(draft))

    if (!title.value.trim()) {
      updateGoal((draft) => { draft.title.error = 'Goal is required' })
      hasErrors = true
    }
    if (!deadline.value.trim()) {
      updateGoal((draft) => { draft.deadline.error = 'Deadline is required' })
      hasErrors = true
    }
    if (!measurableObjective.value.trim()) {
      updateGoal((draft) => { draft.measurableObjective.error = 'Measurable Objective is required' })
      hasErrors = true
    }

    actionPlans.forEach(({
      byWho, deadline, progressIndicator, resourcesRequired,
    }, index: number) => {
      if (!byWho.value.trim()) {
        updateGoal((draft) => { draft.actionPlans[index].byWho.error = 'By who is required' })
        hasErrors = true
      }
      if (!deadline.value.trim()) {
        updateGoal((draft) => { draft.actionPlans[index].deadline.error = 'Deadline is required' })
        hasErrors = true
      }
      if (!progressIndicator.value.trim()) {
        updateGoal((draft) => { draft.actionPlans[index].progressIndicator.error = 'Progress indicator is required' })
        hasErrors = true
      }
      if (!resourcesRequired.value.trim()) {
        updateGoal((draft) => { draft.actionPlans[index].resourcesRequired.error = 'Resources required is required' })
        hasErrors = true
      }
    })

    if (hasErrors) return
    const goal: Goal = {
      title: title.value,
      measurableObjective: measurableObjective.value,
      deadline: deadline.value,
      actionPlans: actionPlans.map(({
        byWho, deadline, resourcesRequired, progressIndicator,
      }) => ({
        byWho: byWho.value,
        deadline: deadline.value,
        resourcesRequired: resourcesRequired.value,
        progressIndicator: progressIndicator.value,
      })),
    }
    if (isEditing) {
      dispatch(editGoal({ goal }))
    } else {
      dispatch(addGoal({ goal }))
    }
    updateGoal({
      ...defaultGoal,
      actionPlans: [{ ...defaultActionPlanStep }],
    })
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
          <Button colorScheme="red" size="sm" onClick={handleCreate}>{isEditing ? 'Save' : 'Create'}</Button>
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

  const { mentee } = useAppSelector(getBasicDetails)
  const { role } = useAppSelector(getAuth)
  const { data: myInfo } = useGetUserInfoQuery({ role: role ?? '' })
  const byWhoOptions = [`${myInfo?.firstName} ${myInfo?.lastName}`, mentee.value]

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
              options={byWhoOptions}
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
