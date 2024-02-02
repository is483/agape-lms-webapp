import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { getMilestones } from '../redux/selectors'
import {
  setMilestoneError,
} from '../redux/mentoringJourneyFormSlice'

function useValidateMilestones() {
  const dispatch = useAppDispatch()
  const { milestones } = useAppSelector(getMilestones)

  return useCallback(() => {
    for (let i = 0; i < milestones.length; i += 1) {
      const { goals } = milestones[i]
      if (goals.length < 1) {
        dispatch(setMilestoneError('Each milestone requires at least one goal'))
        return true
      }
    }
    dispatch(setMilestoneError(''))
    return false
  }, [dispatch, milestones])
}

export default useValidateMilestones
