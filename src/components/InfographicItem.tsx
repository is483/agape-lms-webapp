import {
  Box, BoxProps, Circle, Flex, FlexProps,
  Text,
  TextProps,
} from '@chakra-ui/react'
import Icon from './Icon'

interface InfographicItemProps {
  amount: string | number
  title: string
  iconName: string
  containerProps?: FlexProps
  iconProps?: BoxProps
  circleProps?: BoxProps
  textProps?: TextProps
}

function InfographicItem(props: InfographicItemProps) {
  const {
    amount, title, iconName, containerProps,
    iconProps, circleProps, textProps,
  } = props
  return (
    <Flex gap="4" align="center" {...containerProps}>
      <Box>
        <Circle size={['40px', null, null, '55px']} bg="red.100" {...circleProps}>
          <Icon color="red.700" fontSize={['xl', null, null, '3xl']} name={iconName} {...iconProps} />
        </Circle>
      </Box>
      <Box>
        <Text fontWeight="600">{title}</Text>
        <Text fontSize={['xl', null, null, '2xl']} color="red.500" lineHeight="1.25" fontWeight="600" {...textProps}>{amount}</Text>
      </Box>
    </Flex>
  )
}

InfographicItem.defaultProps = {
  containerProps: {},
  iconProps: {},
  circleProps: {},
  textProps: {},
}

export default InfographicItem
