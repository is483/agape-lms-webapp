import { Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Link from './Link'
import Icon from './Icon'

interface BackButtonProps {
  path?: string
}

function BackButton(props: BackButtonProps) {
  const { path } = props
  const navigate = useNavigate()

  const navigateProps = {
    onClick: !path ? () => navigate(-1) : () => null,
  }

  return (
    <Link fontSize="lg" fontWeight="600" to={path ?? ''} {...navigateProps} gap="2" _hover={{ textDecoration: 'none' }}>
      <Flex align="center">
        <Icon name="arrow_back" />
        Back
      </Flex>
    </Link>
  )
}

BackButton.defaultProps = {
  path: '',
}

export default BackButton
