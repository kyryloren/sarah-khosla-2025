'use client'

import { useTransition, useState } from 'react'
import { disableDraftMode } from 'app/actions'

export default function DisableDraftMode() {
  const [isPending, startTransition] = useTransition()
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'black',
        color: 'white',
        padding: '1em',
        textAlign: 'center',
      }}
    >
      <p>
        Draft mode is enabled.{' '}
        <button
          onClick={() => {
            startTransition(async () => {
              await disableDraftMode()
              setIsVisible(false)
            })
          }}
          disabled={isPending}
        >
          Disable draft mode
        </button>
      </p>
    </div>
  )
}
