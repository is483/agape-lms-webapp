import ReactCalendar from 'react-calendar'
import './Calendar.css'
import { Box, Circle, Flex } from '@chakra-ui/react'

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
      />
    </Box>
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
