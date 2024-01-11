import { createStandaloneToast } from '@chakra-ui/react'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { router } from '../../../main'
import paths from '../../../paths'

const { toast } = createStandaloneToast()

export const defaultOnQueryStarted = async (
  _arg: any,
  { queryFulfilled }: { queryFulfilled: Promise<any> },
) => {
  queryFulfilled.catch(({ error }) => {
    console.error(error)
    const { status } = error as FetchBaseQueryError
    handleFetchError(status)
  })
}

/*
  Re-usable handler function if using custom onQueryStarted
  function instead of defaultOnQueryStarted
*/
export const handleFetchError = (status: number | 'FETCH_ERROR' | 'PARSING_ERROR' | 'TIMEOUT_ERROR' | 'CUSTOM_ERROR') => {
  if (status === 403) {
    router.navigate(paths.Login)
  } else {
    toast({
      title: 'An error occurred.',
      description: 'An unexpected error has occured. Please try again later.',
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
  }
}
