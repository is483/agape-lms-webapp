import { Role } from '../../types'

export interface UserRequest {
  role: string
}

export interface InfoRequest {
  profileImg: string
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  phoneNumber: string
}

export interface ExperienceRequest {
  workExperience: {
    jobTitle: string
    company: string
    description: string
  }[]
}

export interface MenteeExperienceRequest extends ExperienceRequest {
  careerAspirations: string
}

export interface SkillsRequest {
  skills: string[]
}

export interface ValuesRequest {
  personalValues: string[]
}

export interface InterestsRequest {
  interests: string[]
}

export interface ChallengesRequest {
  challenges: string[]
}

export interface MentoringRequest {
  preferredCommunication: string,
  preferredMeetingDays: string[]
}

export interface MentorMentoringRequest extends MentoringRequest {
  preferredMentoringApproach: string[]
}

export interface MenteeMentoringRequest extends MentoringRequest {
  expectations: string
}

export interface RoleResponse {
  role: Role
}

export interface OnboardingResponse {
  onboardingStep?: string
  onboardingComplete: boolean
}

export interface User {
  userInformationId: number
  role? : string
  // TODO: This is supposed to be for generic user. not just mentee
  menteeId: number
  userId: number
  firstName: string
  lastName: string
  dateOfBirth: string
  phoneNumber: string
  gender: string
  email: string
  profileImgUrl: string
  skills: string
  personalValues: string
  preferredCommunication: string
  preferredMeetingDays: string
  challenges: string
  interests: string
  workExperience: string,
  // Only Mentor
  preferredMentoringApproach?: string
  // Only Mentee
  expectations?: string
  careerAspiration?: string
}
export type UserResponse = User

export type TransformedUserResponse = UserResponse & {
  skills: string[]
  personalValues: string[]
  preferredMeetingDays: string[]
  preferredMentoringApproach: string[]
  challenges: string[]
  interests: string[]
  workExperience: {
    jobTitle: string
    company: string
    description: string
  }[]
  // Only Mentee
  expectations: string
  careerAspiration: string
}

export interface AssignedMenteesResponse {
  assignedMentees: User[]
}

export interface UnassignedMenteesResponse {
  unassignedMentees: User[]
}

export interface MentorResponse {
  assignedMentor: User
}

export interface MentorsAdminResponse {
  mentor: User
  assignedMentees: User[]
}

export interface PairingRequest {
  mentorId: string | number
  menteeId: string | number
}
export type AllMentorAdminResponse = MentorsAdminResponse[]
export type AllMenteesResponse = User[]
export type UnAssignedMenteesAdminResponse = User[]
export type AllMentorsResponse = User[]
