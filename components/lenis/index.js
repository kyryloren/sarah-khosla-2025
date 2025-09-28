'use client'

import { ReactLenis } from 'lenis/react'
import { useRef } from 'react'

import 'lenis/dist/lenis.css'

export default function Lenis({ root, options }) {
  const lenisRef = useRef(null)

  return (
    <ReactLenis
      ref={lenisRef}
      root={root}
      options={{
        ...options,
        autoRaf: true,
        anchors: true,
      }}
    />
  )
}
