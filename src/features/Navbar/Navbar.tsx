import { Role } from '../../app/types'

interface Props {
  role: Role | null
}

function Navbar(props: Props) {
  const { role } = props

  return (
    <>
      Navbar
    </>
  )
}

export default Navbar
