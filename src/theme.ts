import { extendTheme } from '@chakra-ui/react'

const colors = {
  primary: {
    900: '#700C10',
    800: '#BB141A',
    700: '#C94348',
    600: '#DD8A8D',
    500: '#FCEAEB',
    400: '#700C10',
    300: '#BB141A',
    200: '#C94348',
    100: '#DD8A8D',
    50: '#DD8A8D',
  },
}

const theme = extendTheme({ colors })

export default theme
