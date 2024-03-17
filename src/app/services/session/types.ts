export interface Session {
  sessionId: string,
  sessionType: string,
  fromDateTime: string,
  toDateTime: string,
  title: string,
  status: string,
  location?: string
  notes?: string
  mentoringJourneyId?: number
  description?: string
  reason?: string
}

export interface CreateSessionRequest {
  menteeId: number | string
  body: {
    title: string
    description: string
    fromDateTime: string
    toDateTime: string
    sessionType: string
    location: string
  }
}

export interface EditSessionRequest {
  sessionId: number | string
  body: {
    title: string
    description: string
    fromDateTime: string
    toDateTime: string
    sessionType: string
    location: string
  }
}

export interface SessionDetailsResponse {
  mentee?: {
    firstName: string
    lastName: string
    profileImgUrl: string
    menteeId: number
  }
  mentor?: {
    mentorId: number
    lastName: string
    firstName: string
    profileImgUrl: string
  }
  sessionDetails: {
    sessionId: number | string
    title: string
    description: string
    fromDateTime: string
    toDateTime: string
    sessionType: string
    location: string
    notes: string | null
  }
}

export interface DeclineSessionRequest {
  sessionId: string | number
  body: {
    reason: string
    fromDateTime: string
    toDateTime: string
  }
}

export interface DeclineReasonResponse {
  declineReason: string
  proposedFromDateTime: string
  proposedToDateTime: string
}

export interface UpdateSessionRequest {
  sessionId: number | string
  body: {
    fromDateTime: string
    toDateTime: string
  }
}

export interface UpdateSessionNotesRequest {
  sessionId: number | string
  body: {
    notes: string
  }
}

export interface AllSessionsByMentoringJourney {
  sessionId: string,
  sessionType: string,
  fromDateTime: string,
  toDateTime: string,
  title: string,
  status: string,
}

export type AllSessionsByMentoringJourneyResponse = Session[]

export type SessionResponse = Session[]
