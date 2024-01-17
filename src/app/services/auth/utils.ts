import { VerifyResetTokenRequest } from './types'

export const resetTokenHeaders = (payload: VerifyResetTokenRequest) => {
  const headers: Headers = new Headers()
  localStorage.removeItem('token')
  headers.set('authorization', `Bearer ${payload.token}`)
  return headers
}
