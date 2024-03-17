export interface SessionFeedback {
  sessionFeedbackId: string
  sessionId: string
  fromDateTime: string
  toDateTime: string
  title: string
  sessionType: string
  status?: string
}

export interface QuarterlyFeedback {
  quarterlyFeedbackId: string
  feedbackAnswers: string[]
  date: string
  status: string
  mentoringJourneyId: string
}

export interface MentorSessionFeedbackResponse {
  mentorSessionFeedbacks: SessionFeedback[]
}

export interface MenteeSessionFeedbackResponse {
  menteeSessionFeedbacks: SessionFeedback[]
}

export interface MentorQuarterlyFeedbackResponse {
  mentorQuarterlyFeedbacks: QuarterlyFeedback[]
}

export interface MenteeQuarterlyFeedbackResponse {
  menteeQuarterlyFeedbacks: QuarterlyFeedback[]
}

export interface AnswerFeedbackRequest {
  feedbackAnswers: any
  id: string | number
}

export interface QuarterlyFeedbackResponse {
  quarterlyFeedbackId: string | number
  feedbackAnswers: string
  date: string
  role: string
  status: string
  mentoringJourneyId: string | number
}

export interface SessionFeedbackResponse {
  sessionFeedbackId: string | number
  sessionId: string | number
  feedbackAnswers: string
  date: string
  role: string
  status: string
}

export interface AllSessionFeedbackByMentoringJourney {
  sessionId: string,
  sessionFeedbackId: string
  fromDateTime: string,
  toDateTime: string,
  title: string,
  sessionType: string,
  mentorFeedbackId: string | number,
  mentorFeedbackStatus: string,
  menteeFeedbackId: string | number,
  menteeFeedbackStatus: string,
}

export interface AllQuarterlyFeedbackByMentoringJourney {
  date: string,
  mentorFeedbackId: string | number,
  mentorFeedbackStatus: string,
  menteeFeedbackId: string | number,
  menteeFeedbackStatus: string,
  // kms this is fake
  quarterlyFeedbackId: string
  feedbackAnswers: string[]
  status: string
  mentoringJourneyId: string
}

export type AllSessionFeedbackByMentoringJourneyResponse = AllSessionFeedbackByMentoringJourney[]
export type AllQuarterlyFeedbackByMentoringJourneyResponse = AllQuarterlyFeedbackByMentoringJourney[]
export interface SessionMetricsResponse {
  mentorSatisfactionScores: {
    totalReviews: number
    veryDissatisfied: number
    Dissatisfied: number
    Neutral: number
    Satisfied: number
    verySatisfied: number
  },
  menteeSatisfactionScores: {
    totalReviews: number
    veryDissatisfied: number
    Dissatisfied: number
    Neutral: number
    Satisfied: number
    verySatisfied: number
  }
}
