export interface SessionFeedback {
  sessionFeedbackId: string
  sessionId: string
  fromDateTime: string
  toDateTime: string
  title: string
  sessionType: string
  status: string
}

export interface QuarterlyFeedback{
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
  quarterlyFeedbackId: string | number
}

export interface FeedbackResponse {
  quarterlyFeedbackId: string | number,
  feedbackAnswers: string,
  date: string,
  role: string,
  status: string,
  mentoringJourneyId: string | number
}
