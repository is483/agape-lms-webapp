import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { getBasicDetails } from '../redux/selectors'
import {
  clearBasicDetailsErrors, setDateError, setMenteeError, setTitleError,
} from '../redux/mentoringJourneyFormSlice'

function useValidateBasicDetails() {
  const dispatch = useAppDispatch()
  const { mentee, title, date } = useAppSelector(getBasicDetails)

  return useCallback(() => {
    let hasErrors: boolean = false
    dispatch(clearBasicDetailsErrors())
    if (!mentee.value.trim()) {
      dispatch(setMenteeError('Mentee is required'))
      hasErrors = true
    }
    if (!title.value.trim()) {
      dispatch(setTitleError('Title is required'))
      hasErrors = true
    }
    if (!date.value.trim()) {
      dispatch(setDateError('Date is required'))
      hasErrors = true
    }
    return hasErrors
  }, [mentee, title, date, dispatch])
}

export default useValidateBasicDetails