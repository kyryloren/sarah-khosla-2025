import Icon from 'components/icon'
import { Container, Grid } from 'styles'

export default function Nav() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-neutral-50 py-5 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50">
      <Container>
        <Grid>
          <div className="col-start-1 col-end-2">
            <p className="text-base leading-5">
              Sarah Khosla
              <br />
              Design & Art Direction
            </p>
          </div>
          <div className="col-start-2 col-end-4">
            <p className="text-base leading-5">
              Previously a Sr. Art Director
              <br />
              at Stink Studios, currently freelancing.
            </p>
          </div>
          <div className="col-start-4 col-end-5">
            <p className="text-base leading-5">
              <a
                href="https://www.linkedin.com/in/sarahkhosla"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-60"
              >
                LinkedIn
              </a>
              <br />
              <a
                href="mailto:hello@sarahkhosla.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60"
              >
                hello@sarahkhosla.com
              </a>
            </p>
          </div>
          <div className="col-start-5 flex w-full justify-end">
            <button className="h-full w-full">
              <Icon name="plus" />
            </button>
          </div>
        </Grid>
      </Container>
    </header>
  )
}
