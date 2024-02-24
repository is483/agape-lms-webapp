export type QuestionType = 'rating' | 'freeform' | 'radio'

export type Question = {
    question: string
    type: QuestionType
    options?: string[]
}
