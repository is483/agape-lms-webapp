import ReactCalendar from 'react-calendar'
import './Calendar.css'
import {
  Box, Button, Circle, Flex, Hide,
  Text,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../../components'
import { Session } from '../../../app/services/session/types'
import { useAppSelector } from '../../../hooks'
import { getAuth } from '../../../app/redux/selectors'
import paths from '../../../paths'

interface CalendarProps {
  sessions: Session[]
  goToPendingTab: () => void
}

const todayDateStr = new Date().toDateString()

const checkActionRequired: Record<'Mentor' | 'Mentee', Record<string, string>> = {
  Mentor: { Rejected: 'actionRequired' },
  Mentee: { Pending: 'actionRequired' },
} as const

function Calendar(props: CalendarProps) {
  const { sessions, goToPendingTab } = props
  const { role } = useAppSelector(getAuth)
  const navigate = useNavigate()
  const today = new Date()

  const datesMap = useMemo(() => {
    const datesMap: Map<string, { status: string, onClick: () => void }> = new Map()

    if (!role || role === 'Admin') return datesMap

    sessions.forEach(({ fromDateTime, status, sessionId }) => {
      datesMap.set(new Date(fromDateTime).toDateString(), {
        status: checkActionRequired[role][status] ?? 'Confirmed',
        onClick: () => {
          if (!checkActionRequired[role][status]) {
            navigate(`${paths.Sessions.Details.subPath}/${sessionId}`)
          } else {
            goToPendingTab()
          }
        },
      })
    })

    return datesMap
  }, [goToPendingTab, navigate, role, sessions])

  return (
    <Box my="8">
      <Flex justify="end">
        <Box border="1px solid" borderColor="gray.200" rounded="md" p="2">
          <Flex align="center" gap="1">
            <Circle size="6px" bgColor="red.600" /> <Text fontSize="xs" color="gray.500">Upcoming / Completed</Text>
          </Flex>
          <Flex align="center" gap="1">
            <Circle size="6px" bgColor="yellow.400" /> <Text fontSize="xs" color="gray.500">Action Required</Text>
          </Flex>
        </Box>
      </Flex>
      <ReactCalendar
        value={today}
        tileContent={({ date, view }) => TileContent({ date, view, datesMap })}
        nextLabel={<Button p="0" rounded="full" variant="ghost"><Icon name="chevron_right" /></Button>}
        prevLabel={<Button p="0" rounded="full" variant="ghost"><Icon name="chevron_left" /></Button>}
        next2Label={null}
        prev2Label={null}
        minDetail="month"
        navigationLabel={NavigationLabel}
      />
    </Box>
  )
}

interface NavigationLabelProps {
  label: string
  date: Date
}

function NavigationLabel(props: NavigationLabelProps) {
  const { label, date } = props
  const formattedDate = date.toLocaleString('en-US', { month: 'short', year: 'numeric' })
  return (
    <Flex w="300px" maxW="100%" height="44px" borderBottom="2px solid" borderColor="red.600" justify="center" align="center">
      <Hide below="sm">
        {label}
      </Hide>
      <Hide above="sm">
        {formattedDate}
      </Hide>
    </Flex>
  )
}

interface TileContentProps {
  date: Date
  view: string
  datesMap: Map<string, { status: string, onClick: () => void }>
}

function TileContent(props: TileContentProps) {
  const { date, view, datesMap } = props
  const dateStr = date.toDateString()
  const dateDay = date.getDate()
  const status = datesMap.get(dateStr)?.status
  const onClick = datesMap.get(dateStr)?.onClick

  if (view === 'month' && (status === 'Confirmed' || status === 'actionRequired')) {
    return (
      <Flex p="2" rounded="full" flexDir="column" align="center" onClick={onClick} _hover={{ background: 'gray.100' }}>
        {dateDay}
        <Circle size="6px" bgColor={status === 'Confirmed' ? 'red.600' : 'yellow.400'} />
      </Flex>
    )
  }
  if (dateStr === todayDateStr) {
    return (
      <Flex w="24px" h="24px" rounded="full" backgroundColor="red.600" color="white" justify="center" align="center">
        <Box>
          {dateDay}
        </Box>
      </Flex>
    )
  }
  return (
    <Box>
      {dateDay}
    </Box>
  )
}

export default Calendar
