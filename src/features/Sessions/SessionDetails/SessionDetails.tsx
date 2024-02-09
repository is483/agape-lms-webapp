import {
  Box, Divider, Text, Flex, HStack, Button,
} from '@chakra-ui/react'
import { BackButton, Container, Icon } from '../../../components'
import paths from '../../../paths'

function SessionDetails() {
  return (
    <Container position="relative" minH="calc(100vh - 34px)">
      <BackButton path={paths.Sessions.ViewAll} />
      <Divider position="absolute" left="0" mt="6" />
      <Flex justifyContent="space-between" flexDir={['column-reverse', 'column-reverse', 'row']} mt="12">
        <Text fontSize="lg" fontWeight="600"> Placeholder for Session Title </Text>
        <HStack alignSelf={{ base: 'flex-end', md: 'center' }} marginBottom={['5', '5', '0']}>
          <Button px="0" rounded="full">
            <Icon name="edit" fontSize="24px" />
          </Button>
          <Button px="0" rounded="full">
            <Icon name="delete" fontSize="30px" />
          </Button>
        </HStack>
      </Flex>

      <Flex gap={['3', '3', '10']} flexDir={['column', 'column', 'row']} mt={['5', '5', '2']}>
        <HStack>
          <Icon name="calendar_today" fontSize="25px" />
          <Text color="secondary.500" isTruncated>30 February 2024</Text>
        </HStack>

        <HStack>
          <Icon name="schedule" fontSize="25px" />
          <Text color="secondary.500" isTruncated>12:00 - 1:00 pm</Text>
        </HStack>

        <HStack>
          <Icon name="hourglass_top" fontSize="25px" />
          <Text color="secondary.500" isTruncated>1 hour</Text>
        </HStack>
      </Flex>

      <HStack mt="3">
        <Icon name="location_on" fontSize="25px" />
        <Text color="secondary.500" isTruncated>zoommtg://zoom.us/join?confno=8529015944&pwd=&uname=Nobody%20-%2051800000000</Text>
      </HStack>

      <Box mt="10">
        <Text fontWeight="600" fontSize="lg">Mentee</Text>
        <Flex mt="4">
          <Box padding="6" _hover={{ shadow: 'md', transition: '0.5s', cursor: 'pointer' }} border="solid 1px" borderRadius="md" borderColor="secondary.50" display="flex" alignItems="center" gap="2">
            Mentee Placeholder Name
          </Box>
        </Flex>
      </Box>
      <Box mt="10">
        <Text fontWeight="600" fontSize="lg">Description </Text>
        <Text color="secondary.500">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </Text>
      </Box>
    </Container>
  )
}
export default SessionDetails
