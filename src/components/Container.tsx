import {
  Box, BoxProps,
  Container as ChakraContainer,
  ContainerProps as ChakraContainerProps,
} from '@chakra-ui/react'

interface ContainerProps extends BoxProps {
  containerProps?: ChakraContainerProps
}

function Container({ children, containerProps, ...rest }: ContainerProps) {
  return (
    <Box padding="8" background="white" rounded="8" margin="4" {...rest}>
      <ChakraContainer maxW="conatiner.xl" {...containerProps}>
        {children}
      </ChakraContainer>
    </Box>
  )
}

Container.defaultProps = {
  containerProps: {},
}

export default Container
