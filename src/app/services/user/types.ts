export interface InfoRequest {
  // profileImgUrl: string
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  phoneNumber: string
}

export interface MentorInfoRequest extends InfoRequest{}

export interface MenteeInfoRequest extends InfoRequest{}
