import localFont from 'next/font/local'

const Haffer = localFont({
  src: [
    {
      path: '../public/fonts/HafferSQ-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/HafferSQ-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/HafferSQ-Bold.woff2',
      weight: '800',
      style: 'bold',
    },
  ],
  variable: '--font-haffer',
  display: 'swap',
})

export default Haffer
