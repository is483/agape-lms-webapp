import {
  Box, InputGroup, InputLeftElement, Text,
  BoxProps,
  Select,
  SelectProps,
} from '@chakra-ui/react'
import { HTMLInputTypeAttribute, forwardRef } from 'react'
import Icon from '../Icon'
import './styles.css'

interface Props {
  error: string
  iconProps?: { name: string } & BoxProps
  type: HTMLInputTypeAttribute | 'select'
  placeholder: string
  boxProps?: BoxProps
  options: string[]
  selectProps?: SelectProps
}

const ControlledSelect = forwardRef<HTMLSelectElement, Props>(({
  error, iconProps, boxProps, options = [], selectProps,
}, ref) => {
  const errorStyleProps = {
    ...(error && { borderColor: 'red.600', borderWidth: '2px' }),
  }

  const InputComponent = (
    <Select ref={ref} placeholder="Select option" {...errorStyleProps} {...selectProps}>
      {options.map((option) => <option value={option}>{option}</option>)}
    </Select>
  )

  const ErrorComponent = <Text position="absolute" fontSize="xs" color="red.600">{error}</Text>

  if (!iconProps) {
    return (
      <Box {...boxProps}>
        {InputComponent}
        {!!error && ErrorComponent}
      </Box>
    )
  }

  return (
    <Box {...boxProps}>
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

ControlledSelect.defaultProps = {
  boxProps: {},
  iconProps: undefined,
  selectProps: undefined,
}

export default ControlledSelect
