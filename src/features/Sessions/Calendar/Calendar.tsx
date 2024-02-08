import ReactCalendar from 'react-calendar'
import './Calendar.css'
import {
  Box, Button, Circle, Flex, Hide,
} from '@chakra-ui/react'
import { Icon } from '../../../components'

interface CalendarProps {
  datesWithSessions: string[]
}

const todayDateStr = new Date().toDateString()

function Calendar(props: CalendarProps) {
  const { datesWithSessions } = props
  const today = new Date()

  const dates = datesWithSessions.map((date) => new Date(date).toDateString())

  const onClickDay = (value: Date) => {
    const dateStr = value.toDateString()
    if (dates.includes(dateStr)) {
      // TODO: add modal here or navigate to session
    }
  }

  return (
    <Box my="8">
      <ReactCalendar
        value={today}
        onClickDay={onClickDay}
        tileContent={({ date, view }) => TileContent({ date, view, datesWithSessions: dates })}
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
  datesWithSessions: string[]
}

function TileContent(props: TileContentProps) {
  const { date, view, datesWithSessions } = props
  const dateStr = date.toDateString()
  const dateDay = date.getDate()
  if (view === 'month' && datesWithSessions.includes(dateStr)) {
    return (
      <Flex flexDir="column" align="center">
        {dateDay}
        <Circle size="6px" bgColor="red.600" />
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
