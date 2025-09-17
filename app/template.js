import { Lenis, Nav, ScrollBar, About } from 'components'

export default function Template({ children }) {
  return (
    <>
      <Nav />
      <About />
      <main id="main">{children}</main>
      {/* <Footer /> */}
      <ScrollBar />
      <Lenis root />
    </>
  )
}
