import { Container } from '../../components'
import QuestionList from './components/QuestionList'
import { MENTOR_QUARTERLY_QUESTIONS } from './constants'

function MentorQuarterlyFeedback() {
  // TODO: Check whether it is view only or it is submitting feedback
  // If query returns feedback as null => !isView
  return (
    <Container minHeight="calc(100vh - 32px)">
      <QuestionList isView={false} sections={MENTOR_QUARTERLY_QUESTIONS} />
    </Container>
  )
}

export default MentorQuarterlyFeedback
