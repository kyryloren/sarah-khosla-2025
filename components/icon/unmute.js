import { forwardRef } from 'react'

const UnmuteIcon = forwardRef((props, ref) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M12 5V19L7 16H2V8H7L12 5Z"
      stroke="currentColor"
      strokeMiterlimit={10}
    />
    <path d="M16 15L22 9" stroke="currentColor" strokeMiterlimit={10} />
    <path d="M16 9L22 15" stroke="currentColor" strokeMiterlimit={10} />
  </svg>
))

export default UnmuteIcon
