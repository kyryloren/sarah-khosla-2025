import { Lenis, Nav, ScrollBar } from 'components'

export default function Template({ children }) {
  return (
    <>
      <Nav />
      <main id="main">{children}</main>
      {/* <Footer /> */}
      <ScrollBar />
      <Lenis root />
    </>
  )
}
