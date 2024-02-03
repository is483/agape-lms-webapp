import { Flex } from '@chakra-ui/react'
import Link from './Link'
import Icon from './Icon'

interface BackButtonProps {
  path: string
}

function BackButton(props: BackButtonProps) {
  const { path } = props
  return (
    <Link fontSize="lg" fontWeight="600" to={path} gap="2" _hover={{ textDecoration: 'none' }}>
      <Flex align="center">
        <Icon name="arrow_back" />
        Back
      </Flex>
    </Link>
  )
}

export default BackButton
