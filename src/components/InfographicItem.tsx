import {
  Box, Circle, Flex, FlexProps,
  Icon, Text,
} from '@chakra-ui/react'

interface InfographicItemProps extends FlexProps {
  amount: string | number
  title: string
  iconName: string
}

function InfographicItem(props: InfographicItemProps) {
  const {
    amount, title, iconName, ...flexProps
  } = props
  return (
    <Flex gap="4" align="center" {...flexProps}>
      <Box>
        <Circle size={['40px', null, null, '55px']} bg="red.100">
          <Icon color="red.700" fontSize={['xl', null, null, '3xl']} name={iconName} />
        </Circle>
      </Box>
      <Box>
        <Text fontWeight="600">{title}</Text>
        <Text fontSize={['xl', null, null, '2xl']} color="red.500" lineHeight="1.25" fontWeight="600">{amount}</Text>
      </Box>
    </Flex>
  )
}

export default InfographicItem
