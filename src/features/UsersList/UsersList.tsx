interface UsersListProps {
  title: string
  description: string
  // TODO: change to correct type
  users: any[]
}

function UsersList(props: UsersListProps) {
  const { title, description, users } = props
  // TODO: render desktop / mobile accordingly
  // TODO: pass in users into desktop / mobile component
  return (
    <>
      {title} <br />
      {description}
    </>
  )
}

// TODO: Component for desktop + mobile

export default UsersList
