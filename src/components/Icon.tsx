import { Box, BoxProps } from '@chakra-ui/react'

interface Props {
  name: string
}

function Icon({ name, ...rest }: Props & BoxProps) {
  return (
    <Box className="material-symbols-outlined" {...rest}>
      {name}
    </Box>
  )
}

export default Icon
