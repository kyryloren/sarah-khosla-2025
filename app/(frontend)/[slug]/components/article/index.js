import { Media } from 'components'
import { Container, Grid } from 'styles'

export default function Article({ data }) {
  return (
    <section className="relative pt-8">
      <Container>
        <Grid>
          {data?.map((item, index) => {
            if (item?._type === 'articleCover') {
              return (
                <div key={index} className="col-span-full">
                  <Media media={item?.media} fill={false} />
                </div>
              )
            }

            if (item?._type === 'articleSplit') {
              return (
                <div
                  key={index}
                  className="col-span-full flex flex-col gap-2 sm:flex-row"
                >
                  <div className="min-w-0 flex-1">
                    <Media media={item?.left_media} fill={false} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Media media={item?.right_media} fill={false} />
                  </div>
                </div>
              )
            }
          })}
        </Grid>
      </Container>
    </section>
  )
}
