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
