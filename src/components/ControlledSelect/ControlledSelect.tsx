import {
  Box, InputGroup, InputLeftElement, Text,
  BoxProps,
  Select,
  SelectProps,
} from '@chakra-ui/react'
import { forwardRef } from 'react'
import Icon from '../Icon'
import './styles.css'

interface Props {
  error: string
  iconProps?: { name: string } & BoxProps
  boxProps?: BoxProps
  options: string[] | { value: string, children: any }[]
  selectProps?: SelectProps
  label?: string
}

const ControlledSelect = forwardRef<HTMLSelectElement, Props>(({
  error, iconProps, boxProps, options = [], selectProps, label,
}, ref) => {
  const errorStyleProps = {
    ...(error && { borderColor: 'red.600', borderWidth: '2px' }),
  }

  const InputComponent = (
    <Select ref={ref} placeholder="Select option" {...errorStyleProps} {...selectProps}>
      {options.map((option) => {
        const isString = typeof option === 'string'
        return (
          <option
            key={isString ? option : option.value}
            value={isString ? option : option.value}
          >
            {isString ? option : option.children}
          </option>
        )
      })}
    </Select>
  )
  const ErrorComponent = <Text position="absolute" fontSize="xs" color="red.600">{error}</Text>
  const LabelComponent = <Text fontSize="md" position="absolute" top="-7">{label}</Text>

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
      <InputGroup>
        {LabelComponent}
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
  label: undefined,
}

export default ControlledSelect
