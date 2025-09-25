import { Lenis, Nav, ScrollBar, About } from 'components'
import { fetchAPI } from 'lib'

export default async function Template({ children }) {
  const data = await fetchAPI('/about', {
    populate: '*',
  })
  const doc = data?.data

  const global = await fetchAPI('/global', {
    populate: '*'
  })
  const globalDoc = global?.data

  return (
    <>
      <Nav socials={globalDoc?.Socials} />
      <About data={doc} socials={globalDoc?.Socials} />
      <main id="main">{children}</main>
      {/* <Footer /> */}
      <ScrollBar />
      <Lenis root />
    </>
  )
}
