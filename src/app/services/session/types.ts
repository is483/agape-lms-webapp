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

export type SessionResponse = Session[]
