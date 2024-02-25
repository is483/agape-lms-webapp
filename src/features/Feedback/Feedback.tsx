import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import SessionFeedback from './components/SessionFeedback'
import QuarterlyFeedback from './components/QuarterlyFeedback'
import { QuarterlyFeedback as QuarterlyFeedbackType, SessionFeedback as SessionFeedbackType } from '../../app/services/feedback/type'

interface FeedbackProps {
  sessionFeedbackData: SessionFeedbackType[] | undefined
  quarterlyFeedbackData: QuarterlyFeedbackType[] | undefined
}

function Feedback(props: FeedbackProps) {
  const { sessionFeedbackData, quarterlyFeedbackData } = props

  return (
    <Tabs mt="5" colorScheme="red" variant="solid-rounded">
      <TabList gap="10">
        <Tab py="1" px={[2, 4]} fontSize={['xs', 'sm', 'md']}>Session Feedback</Tab>
        <Tab py="1" px={[2, 4]} fontSize={['xs', 'sm', 'md']}>Quarterly Feedback</Tab>
      </TabList>
      <TabPanels>
        <TabPanel px="0">
          <SessionFeedback data={sessionFeedbackData} />
        </TabPanel>
        <TabPanel px="0">
          <QuarterlyFeedback data={quarterlyFeedbackData} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
export default Feedback
