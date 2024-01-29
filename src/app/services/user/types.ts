import { Role } from '../../types'

export interface UserRequest {
  role: string
}

export interface UserResponse {
  role: string
  firstName: string
  lastName: string
  dateOfBirth: string
  phoneNumber: string
  gender: string
  profileImgURL: string
  skills: string
  personalValues: string
  preferredCommunication: string
  preferredMeetingDays: string
  challenges: string
  interests: string
  workExperience: string

  // Only Mentor
  preferredMentoringApproach?: string
  // Only Mentee
  expectations?: string
  careerAspirations?: string
}

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

export interface AssignedMenteesResponse {
  userInformationId: number,
  menteeId: number,
  firstName: string,
  lastName: string,
  dateOfBirth: string
  phoneNumber: string
  gender: string
  profileImgURL: string
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
  careerAspirations?: string
}
