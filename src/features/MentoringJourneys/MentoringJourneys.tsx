import {
  Button, Flex, Tab, TabList, TabPanel, TabPanels, TableContainer, Tabs, Text,
  Table, Thead, Tbody, Tr, Th, Td, Badge, Spinner,
} from '@chakra-ui/react'
import {
  Container, InfographicItem, Link, ProfileIcon,
} from '../../components'
import paths from '../../paths'
import { useGetAllMentoringJourneyQuery } from '../../app/services/mentoringJourney/apiMentoringJourneySlice'
import { MentoringJourney } from '../../app/services/mentoringJourney/types'
import { MILESTONES } from './CreateMentoringJourney/redux/constants'

enum MentoringJourneyStatus {
  ONGOING, PAST
}

function MentoringJourneys() {
  const { data, isLoading } = useGetAllMentoringJourneyQuery(null)

  const mentoringJourneys = data?.mentoringJourneysAssigned ?? []

  const ongoingMentoringJourneys = mentoringJourneys.filter(({ status }) => status === 'ongoing')
  const pastMentoringJourneys = mentoringJourneys.filter(({ status }) => status !== 'ongoing')

  return (
    <>
      <Container>
        <Text fontSize="lg" fontWeight="700" mb="4">Welcome</Text>
        <Text>
          This is a dedicated space for you to manage your mentoring journeys with your assigned mentees.<br />
          Organize and keep track of mentoring sessions between each mentee in this platform.
        </Text>
        <Flex mt="8" gap="8" flexWrap="wrap">
          <InfographicItem title="Assigned Mentees" amount="2" iconName="group" />
          <InfographicItem title="Total Sessions Completed" amount="20" iconName="handshake" />
          <InfographicItem title="Total Hours Completed" amount="40" iconName="history" />
        </Flex>
      </Container>
      <Container>
        <Flex justify="space-between" mb="4">
          <Text fontWeight="700" fontSize="lg">Mentoring Journeys</Text>
          <Link to={paths.MentoringJourneys.Create}>
            <Button size={['xs', 'sm', null, 'md']} colorScheme="red">+ Create Journey</Button>
          </Link>
        </Flex>
        <Tabs variant="solid-rounded" colorScheme="red">
          <TabList gap="6">
            <Tab py="1">Ongoing</Tab>
            <Tab py="1">Completed</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px="0">
              {
                isLoading ? (
                  <Flex justify="center" align="center" height="100px">
                    <Spinner size="sm" />
                  </Flex>
                )
                  : <MentoringJourneyTable type={MentoringJourneyStatus.ONGOING} data={ongoingMentoringJourneys} />
              }
            </TabPanel>
            <TabPanel px="0">
              {
                isLoading ? (
                  <Flex justify="center" align="center" height="100px">
                    <Spinner size="sm" />
                  </Flex>
                )
                  : <MentoringJourneyTable type={MentoringJourneyStatus.PAST} data={pastMentoringJourneys} />
              }
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  )
}

interface MentoringJourneyTableProps {
  type: MentoringJourneyStatus
  data: MentoringJourney[]
}

function MentoringJourneyTable(props: MentoringJourneyTableProps) {
  const { type, data } = props

  return (
    <TableContainer whiteSpace="unset" width="100%">
      <Table variant="simple">
        <Thead backgroundColor="gray.100">
          <Tr>
            <Th>Mentee</Th>
            <Th>Title</Th>
            <Th>{type === MentoringJourneyStatus.ONGOING ? 'Milestone' : 'Status'}</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {data.length === 0 && (
            <Tr>
              <Td colSpan={4}>
                <Flex height="40px" justify="center" align="center">
                  No mentoring journeys
                </Flex>
              </Td>
            </Tr>
          )}
          {data.map((mentoringJourney) => {
            const {
              mentee, title, status, milestoneStep, mentoringJourneyId,
            } = mentoringJourney
            const { firstName, lastName, profileImgURL } = mentee
            const fullName = `${firstName} ${lastName}`
            return (
              <Tr key={mentoringJourneyId}>
                <Td>
                  <Flex gap="2" align="center">
                    <ProfileIcon imgUrl={profileImgURL} width="24px" height="24px" iconProps={{ fontSize: '20px' }} />
                    {fullName}
                  </Flex>
                </Td>
                <Td>{title}</Td>
                <Td>
                  {
                    type === MentoringJourneyStatus.ONGOING
                      ? (
                        <>{milestoneStep} - {MILESTONES[milestoneStep - 1].title}</>
                      ) : (
                        <Badge colorScheme={status === 'complete' ? 'green' : 'red'} textTransform="capitalize">{status}</Badge>
                      )
                  }
                </Td>
                <Td>
                  <Flex justify="end">
                    <Link to={`${paths.MentoringJourneys.Details.subPath}/${mentoringJourneyId}`}>
                      <Button>View Details</Button>
                    </Link>
                  </Flex>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default MentoringJourneys
