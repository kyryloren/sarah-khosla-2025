import { VisualEditing } from 'next-sanity/visual-editing'
import { draftMode } from 'next/headers'
import { DisableDraftMode, RouteTheme } from 'components'
import { fetchSanity, queries, urlFor } from 'lib'
import { Analytics } from '@vercel/analytics/next'

import { Haffer } from 'styles'
import '/styles/globals.css'

const title = 'Sarah Khosla'
const description = `Sarah Khosla Personal Portfolio`

export async function generateMetadata() {
  const globalDoc = await fetchSanity(queries.global, {}, undefined)

  return {
    title: {
      template: globalDoc.siteName ? `%s | ${globalDoc.siteName}` : title,
      default: globalDoc.siteName || title,
    },
    description: globalDoc.siteDescription || description,
    keywords: globalDoc.keywords || [],
    openGraph: {
      title: globalDoc.siteName || title,
      description: globalDoc.siteDescription || description,
      url: 'https://www.sarahkhosla.com',
      locale: 'en_US',
      type: 'website',
      images: {
        url: urlFor(globalDoc?.shareImage).url(),
        width: 1200,
        height: 630,
      },
    },
  }
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
        <Analytics />

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
