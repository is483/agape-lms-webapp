import { Container } from '@chakra-ui/react'

function Sessions() {
  // 1.Sessions page will be reused for Mentee and Mentor.
  // a.The main Sessions function will be the container handling the whole interface. (ie, we will include the table, calendar inside here but in separate functions)
  // b.We will create two mentoringJourney table functions: One for Mentee and One for Mentor
  // i. The create button will fall under the mentoringJourney table function
  // c.we can consider putting calendar in a different page so it wont be so messy

  // 2.Create Session will be in a separate folder : CreateSession
  // 3.Session details will also be in a separate folder: Session Details
  // a.Inside the folder, we will have two pages: SessionDetails and EditSessionDetails
  return (
    <Container>
      Sessions
    </Container>
  )
}
export default Sessions
