import { VisualEditing } from 'next-sanity/visual-editing'
import { draftMode } from 'next/headers'
import { DisableDraftMode, RouteTheme } from 'components'

import { Haffer } from 'styles'

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

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const pathname = window.location.pathname;
                  if (pathname === '/') {
                    document.documentElement.classList.add('dark');
                    document.body.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />

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
      <body
        className="bg-neutral-50 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50"
        suppressHydrationWarning
      >
        <div suppressHydrationWarning>{children}</div>
        <RouteTheme />

        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  )
}
