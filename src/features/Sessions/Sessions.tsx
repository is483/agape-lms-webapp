import {
  Flex, Text, Box, TabPanels, Tab, TabList, Tabs, TabPanel, Button, Stack, Hide, useDisclosure,
} from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { getAuth } from '../../app/redux/selectors'
import Container from '../../components/Container'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { ControlledSelect } from '../../components'
import useAssignedMenteesOptions from '../../hooks/useAssignedMenteesOptions'
import Calendar from './Calendar/Calendar'
import SessionFormModal from './SessionFormModal/SessionFormModal'
import UpcomingAndPastSessionsTable from './SessionsTable/UpcomingAndPastSessionsTable'
import PendingSessionsTable from './SessionsTable/PendingSessionsTable'

function Sessions() {
  const dispatch = useAppDispatch()
  const { role } = useAppSelector(getAuth)
  const { isOpen: isSessionFormModalOpen, onOpen: onOpenSessionFormModal, onClose: onSessionFormModalClose } = useDisclosure()
  const [menteeId, setMenteeId] = useState('')
  const { options: assignedMenteeOptions } = useAssignedMenteesOptions()
  const handleMenteeChange = (e: ChangeEvent<HTMLSelectElement>) => setMenteeId(e.target.value)

  useEffect(() => {
    if (assignedMenteeOptions.length > 0 && !menteeId) {
      const firstMenteeId = assignedMenteeOptions[0].value
      setMenteeId(firstMenteeId)
    }
  }, [assignedMenteeOptions, dispatch, menteeId])

  return (
    <Container minHeight="calc(100vh - 32px)">
      <SessionFormModal isModalOpen={isSessionFormModalOpen} onModalClose={onSessionFormModalClose} />
      <Flex justify="space-between" mb="4" gap="2">
        <Box>
          <Text fontWeight="700" fontSize="lg">Sessions </Text>
          <Hide below="sm">
            <Text fontWeight="400" fontSize="md" color="secondary.500"> Browse upcoming, past and pending sessions all in one place!</Text>
          </Hide>
        </Box>
        <Box>
          {role === 'Mentor' && <ControlledSelect options={assignedMenteeOptions} selectProps={{ value: menteeId, onChange: handleMenteeChange }} error="" />}
        </Box>
      </Flex>
      <Hide above="sm">
        <Text fontWeight="400" fontSize="md" color="secondary.500"> Browse upcoming, past and pending sessions all in one place!</Text>
      </Hide>
      <Calendar />
      <Tabs variant="solid-rounded" colorScheme="red">
        <Stack justify="space-between" mb="4" direction={['column-reverse', 'column-reverse', 'row']}>
          <TabList gap={['1', '1', '6']} w="max-content" overflowX="auto">
            <Tab py="1" fontSize={['xs', 'sm']}>Upcoming</Tab>
            <Tab py="1" fontSize={['xs', 'sm']}>Completed</Tab>
            <Tab py="1" fontSize={['xs', 'sm']}>Pending</Tab>
          </TabList>
          {role === 'Mentor' && <Button size="sm" alignSelf={{ base: 'flex-end', md: 'center' }} marginBottom={['5', '5', '0']} colorScheme="red" onClick={onOpenSessionFormModal}>+ Create Session</Button>}
        </Stack>
        <TabPanels>
          <TabPanel px="0" pt="0">
            <UpcomingAndPastSessionsTable />
          </TabPanel>
          <TabPanel px="0" pt="0">
            <UpcomingAndPastSessionsTable />
          </TabPanel>
          <TabPanel px="0" pt="0">
            <PendingSessionsTable />
          </TabPanel>
        </TabPanels>
      </Tabs>

    </Container>
  )
}
export default Sessions
