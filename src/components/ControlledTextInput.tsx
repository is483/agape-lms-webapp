import {
  Box, InputGroup, InputLeftElement, Text,
  Input as ChakraInput,
  BoxProps,
  InputProps,
  TextProps,
} from '@chakra-ui/react'
import { HTMLInputTypeAttribute, forwardRef } from 'react'
import Icon from './Icon'

interface Props {
  error: string
  errorProps?: TextProps
  iconProps?: { name: string } & BoxProps
  type: HTMLInputTypeAttribute | 'select'
  placeholder?: string
  boxProps?: BoxProps
  inputProps?: InputProps
  label?: string
  labelProps?: TextProps
}

const ControlledTextInput = forwardRef<HTMLInputElement, Props>(({
  error, type, placeholder, iconProps, boxProps, inputProps, label,
  labelProps, errorProps,
}, ref) => {
  const errorStyleProps = {
    ...(error && { borderColor: 'red.600', borderWidth: '2px' }),
  }

  const InputComponent = (
    <ChakraInput
      ref={ref}
      type={type}
      placeholder={placeholder}
      {...errorStyleProps}
      {...inputProps}
    />
  )
  const ErrorComponent = <Text position="absolute" fontSize="xs" color="red.600" {...errorProps}>{error}</Text>
  const LabelComponent = <Text fontSize="md" position="absolute" top="-7" {...labelProps}>{label}</Text>

  if (!iconProps) {
    return (
      <Box position="relative" {...boxProps}>
        {LabelComponent}
        {InputComponent}
        {!!error && ErrorComponent}
      </Box>
    )
  }

  return (
    <Box position="relative" {...boxProps}>
      {LabelComponent}
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon {...iconProps} />
        </InputLeftElement>
        {InputComponent}
      </InputGroup>
      {!!error && ErrorComponent}
    </Box>
  )
})

ControlledTextInput.defaultProps = {
  boxProps: {},
  iconProps: undefined,
  inputProps: {},
  label: undefined,
  placeholder: '',
  labelProps: {},
  errorProps: {},
}

export default ControlledTextInput
