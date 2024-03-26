import { useGetUserDetailsAdminQuery } from '../../../app/services/user/apiUserSlice'
import UserDetails from '../../UsersList/UserDetails'

interface MenteeDetailsProps {
  menteeId: string | number
}

function MenteeDetails(props: MenteeDetailsProps) {
  const { menteeId } = props
  const { data: menteeDetails } = useGetUserDetailsAdminQuery(menteeId)

  if (menteeDetails) {
    return <UserDetails user={menteeDetails} isMobile userRole="Mentee" toHide />
  }

  return null
}

export default MenteeDetails
