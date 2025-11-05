import { forwardRef } from 'react'
import PlusIcon from './plus'
import DashIcon from './dash'
import BackIcon from './back'
import MuteIcon from './mute'
import UnmuteIcon from './unmute'

const Icon = forwardRef((props, ref) => {
  switch (props.name) {
    case 'plus':
      return <PlusIcon ref={ref} {...props} />
    case 'dash':
      return <DashIcon ref={ref} {...props} />
    case 'back':
      return <BackIcon ref={ref} {...props} />
    case 'mute':
      return <MuteIcon ref={ref} {...props} />
    case 'unmute':
      return <UnmuteIcon ref={ref} {...props} />
    default:
      return null
  }
})

export default Icon
