import {
  Box, Button, Circle, Flex, FlexProps, Tab, TabList, TabPanel, TabPanels, TableContainer, Tabs, Text,
  Table, Thead, Tbody, Tr, Th, Td, Image, Badge, Spinner,
} from '@chakra-ui/react'
import { Container, Icon, Link } from '../../components'
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
        <Flex justify="space-between">
          <Text fontWeight="700" fontSize="lg">Mentoring Journeys</Text>
          <Link to={paths.MentoringJourneys.Create}>
            <Button colorScheme="red">+ Create Journey</Button>
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

interface InfographicItemProps extends FlexProps {
  amount: string | number
  title: string
  iconName: string
}

function InfographicItem(props: InfographicItemProps) {
  const {
    amount, title, iconName, ...flexProps
  } = props
  return (
    <Flex gap="4" align="center" {...flexProps}>
      <Box>
        <Circle size={['40px', null, null, '55px']} bg="red.100">
          <Icon color="red.700" fontSize={['xl', null, null, '3xl']} name={iconName} />
        </Circle>
      </Box>
      <Box>
        <Text fontWeight="600">{title}</Text>
        <Text fontSize={['xl', null, null, '2xl']} color="red.500" lineHeight="1.25" fontWeight="600">{amount}</Text>
      </Box>
    </Flex>
  )
}

interface MentoringJourneyTableProps {
  type: MentoringJourneyStatus
  data: MentoringJourney[]
}

function MentoringJourneyTable(props: MentoringJourneyTableProps) {
  const { type, data } = props
  return (
    <TableContainer whiteSpace="unset">
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
              <Tr>
                <Td>
                  <Flex gap="2" align="center">
                    {
                      profileImgURL
                        ? <Image src={profileImgURL} borderRadius="100%" maxWidth="100%" width="24px" height="24px" />
                        : (
                          <Circle size="24px" bg="secondary.100">
                            <Icon name="person" color="secondary.300" fontSize="20px" />
                          </Circle>
                        )
                    }
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
                <Td><Button>View Details</Button></Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default MentoringJourneys
