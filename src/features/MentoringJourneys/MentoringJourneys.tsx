import {
  Box, Button, Circle, Flex, FlexProps, Tab, TabList, TabPanel, TabPanels, Tabs, Text,
} from '@chakra-ui/react'
import { Container, Icon, Link } from '../../components'
import paths from '../../paths'

function MentoringJourneys() {
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
            <TabPanel>
              Ongoing
            </TabPanel>
            <TabPanel>
              Completed
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

export default MentoringJourneys
