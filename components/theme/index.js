'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function RouteTheme() {
  const pathname = usePathname()

  useEffect(() => {
    try {
      const isHome = pathname === '/'
      const root = document.documentElement
      const body = document.body

      if (isHome) {
        root.classList.add('dark')
        body.classList.add('dark')
      } else {
        root.classList.remove('dark')
        body.classList.remove('dark')
      }
    } catch (_) {}
  }, [pathname])

  return null
}

