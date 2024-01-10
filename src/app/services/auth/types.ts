import { Role } from '../../types'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface RegisterRequest {
  role: Role
  email: string
  password: string
}

export interface RegisterResponse extends LoginResponse { }

export interface ForgetPasswordRequest {
  email: string
}
