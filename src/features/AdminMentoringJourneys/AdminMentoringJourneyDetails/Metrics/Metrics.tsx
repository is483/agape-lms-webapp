import {
  Box, Tab, TabList, TabPanel, TabPanels, Tabs, Text,
} from '@chakra-ui/react'
import FeedbackMetrics from './FeedbackMetrics'

function Metrics() {
  return (
    <Box>
      <Text marginBottom="7" marginTop="2" color="secondary.500">
        Get a thorough understanding of how mentors and mentees are doing in their mentoring journey!
      </Text>
      <Tabs mt="5" colorScheme="red" variant="solid-rounded">
        <TabList gap="10">
          <Tab py="1" px={[2, 4]} fontSize={['xs', 'sm', 'md']}>Goals</Tab>
          <Tab py="1" px={[2, 4]} fontSize={['xs', 'sm', 'md']}>Session Engagement</Tab>
          <Tab py="1" px={[2, 4]} fontSize={['xs', 'sm', 'md']}>Feedback</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px="0" />
          <TabPanel px="0" />
          <TabPanel px="0">
            <FeedbackMetrics />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
export default Metrics
