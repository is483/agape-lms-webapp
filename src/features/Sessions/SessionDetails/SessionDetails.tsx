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
        <HStack alignSelf={{ base: 'flex-end', md: 'center' }}>
          <Button px="0" rounded="full">
            <Icon name="edit" fontSize="24px" />
          </Button>
          <Button px="0" rounded="full">
            <Icon name="delete" fontSize="30px" />
          </Button>
        </HStack>

      </Flex>
    </Container>
  )
}
export default SessionDetails
