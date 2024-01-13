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
