'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { disableDraftMode } from 'app/actions'

export default function DisableDraftMode() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode()
      router.refresh()
    })

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform">
      {pending ? (
        <div className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white shadow-lg">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          <span className="text-sm font-medium">Disabling draft mode...</span>
        </div>
      ) : (
        <button
          type="button"
          onClick={disable}
          className="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-lg transition-colors duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          tabIndex="0"
          aria-label="Disable draft mode"
        >
          Disable draft mode
        </button>
      )}
    </div>
  )
}
