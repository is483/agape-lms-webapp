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
  mentee?: {
    firstName: string
    lastName: string
    profileImgUrl: string
    menteeId: number
  };
  sessionDetails: {
    title: string
    description: string
    fromDateTime: string
    toDateTime: string
    sessionType: string
    location: string
    notes: string | null
  };
}

export interface DeclineSessionRequest {
  sessionId: string | number
  body: {
    reason: string
    fromDateTime: string
    toDateTime: string
  }
}

export type SessionResponse = Session[]
