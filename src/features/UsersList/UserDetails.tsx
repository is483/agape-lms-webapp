interface UsersListProps {
  user: any
}

function UserDetails(props: UsersListProps) {
  const { user } = props

  return (
    <>
      User details
    </>
  )
}

// TODO: Component for desktop + mobile

export default UserDetails
