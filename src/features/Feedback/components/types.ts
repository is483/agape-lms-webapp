export type QuestionType = 'rating' | 'freeform' | 'radio'

export type Question = {
  question: string
  type: QuestionType
  options?: string[]
}

export type Section = {
  sectionTitle: string
  questions: Question[]
}

export type QuestionState = Question & {
  answer: string
  error: string
}

export type SectionWithAnswers = {
  sectionTitle: string
  questions: QuestionState[]
}[]
