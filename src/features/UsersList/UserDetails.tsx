interface UserDetailsProps {
  user: any
}

function UserDetails(props: UserDetailsProps) {
  const { user } = props

  return (
    <>
      User details
    </>
  )
}

// TODO: Component for desktop + mobile

export default UserDetails
