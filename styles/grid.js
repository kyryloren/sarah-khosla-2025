import { twMerge } from 'tailwind-merge'

export default function Grid(props) {
  const { className, children, ...rest } = props
  return (
    <div
      className={twMerge('grid h-full w-full grid-cols-5 gap-2', className)}
      {...rest}
    >
      {children}
    </div>
  )
}
