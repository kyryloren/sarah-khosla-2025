import { forwardRef } from 'react'

const DashIcon = forwardRef((props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={3}
    fill="none"
    ref={ref}
    {...props}
  >
    <path stroke="currentColor" strokeWidth={2} d="M0 1.762h25.524" />
  </svg>
))

export default DashIcon
