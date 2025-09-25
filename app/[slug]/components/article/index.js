import { Container, Grid, RenderMedia } from 'styles'

export default function Article({ data }) {
  console.log(data)

  return (
    <section className="relative pt-16">
      <Container>
        <Grid>
          {data?.map((item, index) => {
            if (item?.__component === 'article.cover') {
              return (
                <div key={index} className="col-span-full">
                  <RenderMedia data={item?.media} />
                </div>
              )
            }

            if (item?.__component === 'article.split') {
              return (
                <div key={index} className="col-span-full flex gap-2">
                  <RenderMedia data={item?.left_media} />
                  <RenderMedia data={item?.right_media} />
                </div>
              )
            }
          })}
        </Grid>
      </Container>
    </section>
  )
}
