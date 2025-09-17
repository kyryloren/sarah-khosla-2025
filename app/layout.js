import { Haffer } from 'styles'
import { headers } from 'next/headers'

import '/styles/globals.css'

const title = 'Sarah Khosla'
const description = `Sarah Khosla Personal Portfolio`

export const metadata = {
  title: {
    template: '%s | Sarah Khosla',
    default: title,
  },
  description: description,
  keywords: [],
  openGraph: {
    title: title,
    description: description,
    url: 'https://www.sarahkhosla.com',
    locale: 'en_US',
    type: 'website',
    images: {
      url: `${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'https://www.sarahkhosla.com'
      }/og-image.jpg`,
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    creator: '@newstudio',
    images: [
      `${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'https://www.sarahkhosla.com'
      }/og-image.jpg`,
    ],
  },
}

export default async function RootLayout({ children }) {
  const headersList = await headers()
  const isRootRoute = headersList.get('x-is-root-route') === 'true'

  // Add 'dark' class to body when on the root route
  const bodyClassName = `bg-neutral-50 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50 ${isRootRoute ? 'dark' : ''}`

  return (
    <html
      className={`${Haffer.className}`}
      lang="en-US"
      dir="ltr"
      suppressHydrationWarning
    >
      <head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="referrer" content="no-referrer" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="US" />

        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="New Studio" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={bodyClassName} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
