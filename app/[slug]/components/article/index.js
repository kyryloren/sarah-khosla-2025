import { Container, Grid, RenderMedia } from 'styles'

export default function Article({ data }) {
  return (
    <section className="relative pt-8">
      <Container>
        <Grid>
          {data?.map((item, index) => {
            if (item?._type === 'articleCover') {
              const mediaData =
                item?.media?.mediaType === 'video'
                  ? item?.media?.video
                  : item?.media?.image
              const alt =
                item?.media?.mediaType === 'video'
                  ? item?.media?.video?.alt
                  : item?.media?.image?.alt

              return (
                <div key={index} className="col-span-full">
                  <RenderMedia data={mediaData} alt={alt} fill={false} />
                </div>
              )
            }

            if (item?._type === 'articleSplit') {
              const leftMediaData =
                item?.left_media?.mediaType === 'video'
                  ? item?.left_media?.video
                  : item?.left_media?.image
              const leftAlt =
                item?.left_media?.mediaType === 'video'
                  ? item?.left_media?.video?.alt
                  : item?.left_media?.image?.alt

              const rightMediaData =
                item?.right_media?.mediaType === 'video'
                  ? item?.right_media?.video
                  : item?.right_media?.image
              const rightAlt =
                item?.right_media?.mediaType === 'video'
                  ? item?.right_media?.video?.alt
                  : item?.right_media?.image?.alt

              return (
                <div key={index} className="col-span-full flex gap-2">
                  <RenderMedia
                    data={leftMediaData}
                    alt={leftAlt}
                    fill={false}
                  />
                  <RenderMedia
                    data={rightMediaData}
                    alt={rightAlt}
                    fill={false}
                  />
                </div>
              )
            }
          })}
        </Grid>
      </Container>
    </section>
  )
}
