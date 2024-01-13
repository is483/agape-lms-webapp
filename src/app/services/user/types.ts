import { WorkExperience } from '../../../features/Onboarding/component/ProfessionalExperience/ProfessionalExperience'

export interface InfoRequest {
  // profileImgUrl: string
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  phoneNumber: string
}

export interface ExperienceRequest {
  workExperiences: WorkExperience[];
}

export interface MenteeExperienceRequest extends ExperienceRequest{
  careerAspiration: string
}

export interface SkillsRequest{
  skills: string[]
}

export interface ValuesRequest {
  values: string[]
}

export interface InterestsRequest{
  interests: string[]
}
