import { forwardRef } from 'react'

const MuteIcon = forwardRef((props, ref) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    ref={ref}
  >
    <path d="M12 5V19L7 16H2V8H7L12 5Z" stroke="black" strokeMiterlimit={10} />
    <path
      d="M19.3 19.3C21.0459 17.2685 22.0059 14.6786 22.0059 12C22.0059 9.3214 21.0459 6.73148 19.3 4.70001"
      stroke="currentColor"
      strokeMiterlimit={10}
    />
    <path
      d="M16.4 16.4C17.4429 15.1711 18.0154 13.6118 18.0154 12C18.0154 10.3882 17.4429 8.82888 16.4 7.60001"
      stroke="currentColor"
      strokeMiterlimit={10}
    />
  </svg>
))

export default MuteIcon
