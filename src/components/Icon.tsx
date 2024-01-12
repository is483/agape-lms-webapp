import { Box, BoxProps } from '@chakra-ui/react'

interface Props {
  name: string
}

const defaultIconStyles = {
  fontWeight: '300',
  color: 'secondary.600',
}

function Icon({ name, ...props }: Props & BoxProps) {
  return (
    <Box className="material-symbols-outlined" {...defaultIconStyles} {...props}>
      {name}
    </Box>
  )
}

export default Icon
