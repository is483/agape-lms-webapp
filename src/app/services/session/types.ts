export interface Session {
  sessionId: number
  status: string
  fromDateTime: string
  toDateTime: string
  sessionType: string
  location: string
  notes: string
  mentoringJourneyId: number
  title: string
  description: string
  reason: string
}

export interface SessionDetailsResponse {
  mentee: {
    firstName: string
    lastName: string
    profileImgUrl: string
  };
  sessionDetails: {
    title: string
    description: string
    fromDateTime: string
    toDateTime: string
    sessionType: string
    location: string
    notes?: string
  };
}

export type SessionResponse = Session[]
