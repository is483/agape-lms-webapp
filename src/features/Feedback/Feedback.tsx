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
    <Tabs mt="5" colorScheme="red" variant="solid-rounded">
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
  )
}
export default Feedback
