import { forwardRef } from 'react'

const BackIcon = forwardRef((props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={10}
    fill="none"
    ref={ref}
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="m4.648.645.704.71-3.14 3.11 14.79.035-.003 1-14.797-.035 3.153 3.183-.71.704L.293 4.959 4.648.645Z"
      clipRule="evenodd"
    />
  </svg>
))

export default BackIcon
