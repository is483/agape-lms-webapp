import { Box, BoxProps } from '@chakra-ui/react'

interface Props {
  name: string
}

const defaultIconStyles = {
  fontWeight: '300',
}

function Icon({ name, ...props }: Props & BoxProps) {
  return (
    <Box className="material-symbols-outlined" {...defaultIconStyles} {...props}>
      {name}
    </Box>
  )
}

export default Icon
