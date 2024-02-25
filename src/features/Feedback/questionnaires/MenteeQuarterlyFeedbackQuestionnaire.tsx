import { Container } from '../../../components'
import QuestionList from '../components/QuestionList'
import { MENTEE_QUARTERLY_QUESTIONS } from '../constants'

function MenteeQuarterlyFeedbackQuestionnaire() {
  // TODO: Check whether it is view only or it is submitting feedback
  // If query returns feedback as null => !isView
  const onSubmit = (answers: any) => {
    // TODO: Add endpoint to update feedback
    console.log(answers)
  }

  return (
    <Container minHeight="calc(100vh - 32px)">
      <QuestionList isView={false} sections={MENTEE_QUARTERLY_QUESTIONS} onSubmit={onSubmit} />
    </Container>
  )
}

export default MenteeQuarterlyFeedbackQuestionnaire
