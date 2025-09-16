import { forwardRef } from 'react'
import PlusIcon from './plus'

const Icon = forwardRef((props, ref) => {
  switch (props.name) {
    case 'plus':
      return <PlusIcon ref={ref} {...props} />
    default:
      return null
  }
})

export default Icon
