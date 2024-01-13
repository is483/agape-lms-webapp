import { Role } from '../../types'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface RegisterRequest {
  role: string
  email: string
  password: string
  confirmPassword: string
}

export interface ForgetPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  password: string
}

export interface VerifyResetTokenRequest {
  token: string
}

export interface VerifyResetTokenResponse {
  successful: boolean
  error: string
  fullName: string
}
