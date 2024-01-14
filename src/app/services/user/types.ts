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
  personalValues: string[]
}

export interface InterestsRequest{
  interests: string[]
}

export interface ChallengesRequest{
  challenges: string[]
}

export interface MentoringRequest{
  preferredCommunication: string,
  preferredMeetingDays: string[]
}

export interface MentorMentoringRequest extends MentoringRequest{
  preferredMentoringApproach: string[]
}

export interface MenteeMentoringRequest extends MentoringRequest{
  expectations : string
}
