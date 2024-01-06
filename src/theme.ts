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
  secondary: {
    50: '#F2F2F2',
    100: '#DBDBDC',
    200: '#C4C4C5',
    300: '#ADADAE',
    400: '#969697',
    500: '#7E7F81',
    600: '#656667',
    700: '#4C4C4D',
    800: '#333333',
    900: '#19191A',
  },
}

const theme = extendTheme({ colors })

export default theme
