import { forwardRef } from 'react'

const PlusIcon = forwardRef((props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={26}
    fill="none"
    ref={ref}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeWidth={2}
      d="M13.096.11v25.525M.982 12.873h25.525"
    />
  </svg>
))

export default PlusIcon
