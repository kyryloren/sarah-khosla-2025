// index.js
'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { twMerge } from 'tailwind-merge'

export default function CustomLink({
  href,
  fallback = 'div',
  onClick,
  children,
  $underline = false,
  disabled = false,
  className,
  ...props
}) {
  const linkRef = useRef(null)

  /*─────────────── 1 ▸ non-link fallback ───────────────*/
  if (!href || typeof href !== 'string') {
    const Tag = fallback
    return (
      <Tag
        ref={linkRef}
        onClick={onClick}
        className={twMerge('inline-block', className)}
        {...props}
      >
        {children}
      </Tag>
    )
  }

  const isExternal =
    href.startsWith('http') ||
    href.startsWith('mailto') ||
    href.startsWith('tel')

  const linkProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    if (onClick) onClick(e)
  }

  /*─────────────── 2 ▸ class helpers ───────────────*/
  const withUnderline = $underline || isExternal

  const root = twMerge(
    'group relative inline-flex w-fit cursor-pointer select-none items-center overflow-hidden',
    'text-base leading-5',
    disabled && 'pointer-events-none cursor-default text-neutral-500',
    className,
  )

  const lineBase =
    'absolute left-0 bottom-0 h-px w-full bg-current ' +
    'transition-transform duration-600 ease-[cubic-bezier(0.25,0.1,0.25,1)]'

  const lineA = twMerge(
    lineBase,
    withUnderline
      ? 'origin-right scale-x-100 delay-150 group-hover:scale-x-0 group-hover:delay-0'
      : 'origin-right scale-x-0',
  )

  const lineB = twMerge(
    lineBase,
    withUnderline
      ? 'origin-left scale-x-0 group-hover:scale-x-100 group-hover:delay-150'
      : 'origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 group-hover:delay-150',
  )

  const content =
    'transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]'

  /*─────────────── 4 ▸ render ───────────────*/
  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={handleClick}
      style={{
        '--spacing': '4px',
        '--icon-size': '11px',
      }}
      className={root}
      disabled={disabled}
      {...linkProps}
      {...props}
    >
      {/* underlines */}
      <span aria-hidden className={lineA} />
      <span aria-hidden className={lineB} />

      {/* label */}
      <span className={content}>{children}</span>
    </Link>
  )
}
