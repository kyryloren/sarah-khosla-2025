import { forwardRef } from 'react'
import PlusIcon from './plus'
import DashIcon from './dash'

const Icon = forwardRef((props, ref) => {
  switch (props.name) {
    case 'plus':
      return <PlusIcon ref={ref} {...props} />
    case 'dash':
      return <DashIcon ref={ref} {...props} />
    default:
      return null
  }
})

export default Icon
