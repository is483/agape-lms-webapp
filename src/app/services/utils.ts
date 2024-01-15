import { createStandaloneToast } from '@chakra-ui/react'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import { router } from '../../main'
import paths from '../../paths'
import { setIsLoggedIn, setToken } from '../redux/appSlice'

const { toast } = createStandaloneToast()

interface PartialOnQueryStarted {
  queryFulfilled: Promise<any>
  dispatch: ThunkDispatch<any, any, UnknownAction>
}

export const defaultOnQueryStarted = async (
  _arg: any,
  { queryFulfilled, dispatch }: PartialOnQueryStarted,
) => {
  queryFulfilled.catch(({ error }) => {
    console.error(error)
    const { status } = error as FetchBaseQueryError
    handleFetchError(status, dispatch)
  })
}

/*
  Re-usable handler function if using custom onQueryStarted
  function instead of defaultOnQueryStarted
*/
export const handleFetchError = (
  status: number | 'FETCH_ERROR' | 'PARSING_ERROR' | 'TIMEOUT_ERROR' | 'CUSTOM_ERROR',
  dispatch: ThunkDispatch<any, any, UnknownAction>,
) => {
  if (status === 403) {
    dispatch(setToken(null))
    dispatch(setIsLoggedIn(false))
    localStorage.removeItem('token')
    router.navigate(paths.SessionExpired)
  } else {
    toast({
      title: 'Error',
      description: 'An unexpected error has occured. Please try again later.',
      status: 'error',
      duration: 9000,
      isClosable: true,
      position: 'bottom-right',
    })
  }
}
