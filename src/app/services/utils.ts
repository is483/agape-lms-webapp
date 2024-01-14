import { createStandaloneToast } from '@chakra-ui/react'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import { router } from '../../main'
import paths from '../../paths'
import { setAuth } from '../redux/appSlice'

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
    dispatch(setAuth({
      token: null,
      isLoggedIn: false,
      role: null,
    }))
    localStorage.removeItem('token')
    router.navigate(paths.SessionExpired)
  } else if (typeof status === 'number' && status >= 500) {
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
