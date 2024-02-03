import { BoxProps, Circle, Image } from '@chakra-ui/react'
import Icon from './Icon'

interface ProfileIconProps extends BoxProps {
  imgUrl: string | undefined
  iconProps?: BoxProps
}

function ProfileIcon(props: ProfileIconProps) {
  const { imgUrl, iconProps, ...rest } = props
  if (imgUrl) {
    return <Image src={imgUrl} borderRadius="100%" maxWidth="100%" width="48px" height="48px" {...rest} />
  }
  return (
    <Circle size="48px" bg="secondary.100" {...rest}>
      <Icon name="person" color="secondary.300" fontSize="36px" {...iconProps} />
    </Circle>
  )
}

ProfileIcon.defaultProps = {
  iconProps: {},
}

export default ProfileIcon
