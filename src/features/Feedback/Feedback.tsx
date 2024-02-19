import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import Container from '../../components/Container'
import SessionFeedback from './SessionFeedback'
import QuarterlyFeedback from './QuarterlyFeedback'

function Feedback() {
  return (
    <Container minHeight="calc(100vh - 32px)">
      <Box paddingY="5">
        <Text fontSize="2xl" fontWeight="600"> Feedback </Text>
        <Text color="secondary.500">Manage your feedback for each session and quarter of each milestone</Text>
      </Box>
      <Tabs mt="5" colorScheme="red">
        <TabList gap="10">
          <Tab py="1" px={['1', '2', '4']} fontSize={['xs', 'sm', 'md']}>Session Feedback</Tab>
          <Tab py="1" px={['1', '2', '4']} fontSize={['xs', 'sm', 'md']}>Quarterly Feedback</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px="0">
            <SessionFeedback />
          </TabPanel>
          <TabPanel px="0">
            <QuarterlyFeedback />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}
export default Feedback
