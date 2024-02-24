import { Section } from './components/types'

const relevanceOptions = ['Not Relevant', 'Somewhat Relevant', 'Moderately Relevant', 'Very Relevant', 'Extremely Relevant']

const engagementOptions = ['Not Engaged', 'Somewhat Engaged', 'Moderately Engaged', 'Very Engaged', 'Extremely Engaged']

const clarityOfGuidanceOptions = ['Not Clear', 'Somewhat Clear', 'Moderately Clear', 'Very Clear', 'Extremely Clear']

const helpfulnessOfSuggestionsOptions = ['Not Helpful', 'Somewhat Helpful', 'Moderately Helpful', 'Very Helpful', 'Extremely Helpful']

const sessionDurationOptions = ['Far Too Short', 'Somewhat Short', 'Just Right', 'Somewhat Long', 'Far Too Long']

const comfortInDiscussionOptions = ['Very Uncomfortable', 'Uncomfortable', 'Neutral', 'Comfortable', 'Very Comfortable']

const actionableTakeawaysOptions = ['None', 'A Few', 'Some', 'Many', 'A Wealth of Actionable Takeaways']

const overallSatisfactionOptions = ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied']

const sessionEffectivenessOptions = ['Not Effective', 'Somewhat Effective', 'Moderately Effective', 'Very Effective', 'Extremely Effective']

const menteeEngagementOptions = ['Not Engaged', 'Somewhat Engaged', 'Moderately Engaged', 'Very Engaged', 'Extremely Engaged']

const clarityOfCommunicationOptions = ['Not Clear', 'Somewhat Clear', 'Moderately Clear', 'Very Clear', 'Extremely Clear']

const relevanceOfGuidanceOptions = ['Not Relevant', 'Somewhat Relevant', 'Moderately Relevant', 'Very Relevant', 'Extremely Relevant']

const sessionDurationOptionsMentor = ['Far Too Short', 'Somewhat Short', 'Just Right', 'Somewhat Long', 'Far Too Long']

const effectivenessOfSolutionsOptions = ['Not Effective', 'Somewhat Effective', 'Moderately Effective', 'Very Effective', 'Extremely Effective']

const opportunitiesForImprovementOptions = ['Not Apparent', 'A Few Areas', 'Some Areas', 'Many Areas', 'Numerous Areas']

const overallSatisfactionOptionsMentor = ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied']

export const MENTOR_SESSION_QUESTIONS: Section[] = [{
  sectionTitle: 'Section 1: Please rate the following aspects of the mentoring session using the options provided for each question. Choose the option that best reflects your assessment for each aspect.',
  questions: [
    { question: 'How effective was this ad hoc mentoring session in addressing the mentee\'s needs or concerns?', type: 'radio', options: sessionEffectivenessOptions },
    { question: 'To what extent did the mentee actively engage and participate in the discussion during this session?', type: 'radio', options: menteeEngagementOptions },
    { question: 'How clear was the mentee in expressing their thoughts, questions, or challenges during this session?', type: 'radio', options: clarityOfCommunicationOptions },
    { question: 'How relevant were the guidance, suggestions, or advice provided by you during this session?', type: 'radio', options: relevanceOfGuidanceOptions },
    { question: 'Was the duration of the ad hoc session appropriate for addressing the mentee\'s needs or concerns?', type: 'radio', options: sessionDurationOptionsMentor },
    { question: 'How effective do you believe the solutions or strategies discussed during this session will be in addressing the mentee\'s challenges?', type: 'radio', options: effectivenessOfSolutionsOptions },
    { question: 'What areas do you think could be improved upon in future ad hoc mentoring sessions?', type: 'radio', options: opportunitiesForImprovementOptions },
    { question: 'How satisfied are you overall with the outcomes or discussions of this ad hoc mentoring session?', type: 'radio', options: overallSatisfactionOptionsMentor },
  ],
}]

export const MENTOR_QUARTERLY_QUESTIONS: Section[] = [{
  sectionTitle: 'Section 1: Rate the following statements from 1 (Strongly Disagree) to 5 (Strongly Agree)',
  questions: [
    { question: 'Programme Structure: The programme activities are well-organized and easy to follow.', type: 'rating' },
    { question: 'Goal Achievement: I feel confident in helping my mentee achieve their goals.', type: 'rating' },
    { question: 'Communication Effectiveness: Communication with my mentee is clear and open.', type: 'rating' },
    { question: 'Programme Relevance: The programme content is relevant to the needs of my mentee.', type: 'rating' },
    { question: 'Support Resources: Adequate resources are provided to assist me in supporting my mentee.', type: 'rating' },
    { question: 'Overall Satisfaction: Overall, I am satisfied with my experience as a mentor in this programme.', type: 'rating' },
  ],
}, {
  sectionTitle: 'Section 2: Qualitative questions',
  questions: [
    { question: 'What aspects of the programme do you find most beneficial in supporting your mentee? Please explain.', type: 'freeform' },
    { question: 'Can you share any specific challenges you\'ve encountered in your mentoring role? How did you address them?', type: 'freeform' },
    { question: 'How would you describe the impact of the programme on your mentee\'s personal and professional growth?', type: 'freeform' },
    { question: 'What suggestions do you have for improving the mentorship experience in this programme?', type: 'freeform' },
  ],
}]

export const MENTEE_SESSION_QUESTIONS: Section[] = [{
  sectionTitle: 'Section 1: Please rate the following aspects of the mentoring session using the options provided for each question. Choose the option that best reflects your assessment for each aspect.',
  questions: [
    { question: 'How relevant was the content discussed during this ad hoc session to your current needs or challenges?', type: 'radio', options: relevanceOptions },
    { question: 'To what extent did the mentor actively engage and respond to your queries or concerns during this session?', type: 'radio', options: engagementOptions },
    { question: 'How clear were the explanations or guidance provided by the mentor in addressing your issues or questions?', type: 'radio', options: clarityOfGuidanceOptions },
    { question: 'How helpful were the suggestions or recommendations offered by the mentor in resolving your concerns or challenges?', type: 'radio', options: helpfulnessOfSuggestionsOptions },
    { question: 'Was the duration of the ad hoc session adequate to address your primary concerns or issues?', type: 'radio', options: sessionDurationOptions },
    { question: 'How comfortable did you feel expressing your thoughts or difficulties during this ad hoc session?', type: 'radio', options: comfortInDiscussionOptions },
    { question: 'To what extent do you feel you have actionable steps or strategies to implement following this ad hoc session?', type: 'radio', options: actionableTakeawaysOptions },
    { question: 'How satisfied are you overall with the outcomes or discussions of this ad hoc mentoring session?', type: 'radio', options: overallSatisfactionOptions },
  ],
}]

export const MENTEE_QUARTERLY_QUESTIONS: Section[] = [{
  sectionTitle: 'Section 1: Rate the following statements from 1 (Strongly Disagree) to 5 (Strongly Agree)',
  questions: [
    { question: 'Goal Clarity: I have a clear understanding of the goals set in the programme.', type: 'rating' },
    { question: 'Mentor Support: My mentor provides valuable support and guidance.', type: 'rating' },
    { question: 'Communication Satisfaction: Communication with my mentor is effective and meets my needs.', type: 'rating' },
    { question: 'Programme Engagement: I actively engage in programme activities and workshops.', type: 'rating' },
    { question: 'Perceived Growth: I feel that I am making progress towards my personal and professional goals.', type: 'rating' },
    { question: 'Overall Satisfaction: Overall, I am satisfied with my experience as a mentee in this programme.', type: 'rating' },
  ],
}, {
  sectionTitle: 'Section 2: Qualitative questions',
  questions: [
    { question: 'What specific support or guidance have you found most valuable from your mentor?', type: 'freeform' },
    { question: 'Describe any challenges you\'ve faced during the programme. How have you worked to overcome them?', type: 'freeform' },
    { question: 'In what ways has the programme contributed to your personal and professional development?', type: 'freeform' },
    { question: 'Are there any areas of the programme you feel could be improved to better meet your needs? Please share your thoughts.', type: 'freeform' },
  ],
}]
