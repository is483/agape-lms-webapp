import Container from '../../components/Container'

function Sessions() {
  // 1.Sessions page will be reused for Mentee and Mentor.
  // a.The main Sessions function will be the container handling the whole interface. (ie, we will include the table, calendar inside here but in separate functions)
  // i.Mentor will need to include dropdown (hide it if its unavailable)
  // ii.Create session will be inside the Sessions function
  // b.We will create two mentoringJourney table functions: One for Mentee and One for Mentor
  // c.we can consider putting calendar in a different page so it wont be so messy

  // 2.Create Session will be in a separate folder : CreateSession
  // 3.Session details will also be in a separate folder: Session Details
  // a.Inside the folder, we will have two pages: SessionDetails and EditSessionDetails
  return (
    <Container minHeight="100vh">
      Sessions
    </Container>
  )
}
export default Sessions
