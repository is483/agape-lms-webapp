import {
  Box, Tab, TabList, TabPanel, TabPanels, Tabs, Text,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

function Feedback() {
  const { mentoringJourneyId } = useParams()
  return (
    <Box>
      <Box paddingY="5">
        <Text color="secondary.500">
          Manage your feedback for each session and quarter of each milestone.
          <b> Note that session feedback is only available for completed sessions.</b>
        </Text>
      </Box>
      <Tabs mt="5" colorScheme="red" variant="solid-rounded">
        <TabList gap="10">
          <Tab py="1" px={[2, 4]} fontSize={['xs', 'sm', 'md']}>Session Feedback</Tab>
          <Tab py="1" px={[2, 4]} fontSize={['xs', 'sm', 'md']}>Quarterly Feedback</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px="0" />
          <TabPanel px="0" />
        </TabPanels>
      </Tabs>

    </Box>
  )
}
export default Feedback
