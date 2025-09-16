import { twMerge } from 'tailwind-merge'

export default function Container(props) {
  return (
    <div className={twMerge('relative mx-auto px-5', props.className)}>
      {props.children}
    </div>
  )
}
