import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { getObjectives } from '../redux/selectors'
import {
  clearObjectiveErrors, setMentoringOutcomeError, setOutcomeDescriptionError,
} from '../redux/mentoringJourneyFormSlice'

function useValidateObjectives() {
  const dispatch = useAppDispatch()
  const { outcome, description } = useAppSelector(getObjectives)
  return useCallback(() => {
    let hasErrors: boolean = false
    dispatch(clearObjectiveErrors())
    if (!outcome.value.trim()) {
      dispatch(setMentoringOutcomeError('Mentoring Outcome is required'))
      hasErrors = true
    }

    if (outcome.value.length > 100) {
      dispatch(setMentoringOutcomeError(`Title must not exceed 100 characters (${outcome.value.length} / 100)`))
      hasErrors = true
    }

    if (!description.value.trim()) {
      dispatch(setOutcomeDescriptionError('Outcome description is required'))
      hasErrors = true
    }

    if (description.value.length > 500) {
      dispatch(setOutcomeDescriptionError(`Description must not exceed 500 characters (${outcome.value.length} / 500)`))
      hasErrors = true
    }
    return hasErrors
  }, [description.value, dispatch, outcome.value])
}

export default useValidateObjectives
