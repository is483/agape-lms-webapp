import { Link as ReactRouterLink, LinkProps } from 'react-router-dom'
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react'

function Link({ children, ...props }: ChakraLinkProps & LinkProps) {
  return (
    <ChakraLink as={ReactRouterLink} {...props}>
      {children}
    </ChakraLink>
  )
}

export default Link
