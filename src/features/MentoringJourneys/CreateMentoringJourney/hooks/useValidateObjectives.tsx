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
    if (!outcome.value) {
      dispatch(setMentoringOutcomeError('Mentoring Outcome is required'))
      hasErrors = true
    }
    if (!description.value) {
      dispatch(setOutcomeDescriptionError('Outcome description is required'))
      hasErrors = true
    }
    return hasErrors
  }, [description.value, dispatch, outcome.value])
}

export default useValidateObjectives
