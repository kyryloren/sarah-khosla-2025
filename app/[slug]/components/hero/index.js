import { Container, Grid } from 'styles'

export default function Hero() {
  return (
    <section className="relative pt-48">
      <Container>
        <Grid>
          <div className="col-start-2 col-end-4">
            <p className="text-sm leading-4">
              Sugaar Restaurant – Brand System
            </p>
          </div>

          <div className="col-start-4 -col-end-1">
            <p className="text-sm font-bold leading-4">Project Info</p>
          </div>
        </Grid>

        {/* expanded info */}
        <Grid className="mt-8">
          <ul className="col-start-2 col-end-4 flex flex-col">
            <li className="flex gap-4">
              <p className="text-sm leading-4 flex-1">Agency</p>
              <p className="text-sm leading-4 flex-[4.5]">Julen Saenz</p>
            </li>
            <li className="flex gap-4">
              <p className="text-sm leading-4 flex-1">Client</p>
              <p className="text-sm leading-4 flex-[4.5]">Sugaar Restaurant</p>
            </li>
            <li className="flex gap-4">
              <p className="text-sm leading-4 flex-1">Role</p>
              <p className="text-sm leading-4 flex-[4.5]">
                Creative Direction, Graphic Design
              </p>
            </li>
            <li className="flex gap-4">
              <p className="text-sm leading-4 flex-1">Year</p>
              <p className="text-sm leading-4 flex-[4.5]">2024</p>
            </li>
          </ul>

          <div className="col-start-4 -col-end-1">
            <p className="mb-8 text-2xl leading-7">
              The powerful and flamboyant spirit of Basque Country tradition
              meets French elegance and refinement in a whirlwind of simplicity
              and authenticity. Allowed by singular exceptional products and
              charcoal cooking and technique, these two spirits here find a
              unique and intimate fusion.
            </p>

            <p className="text-sm leading-4">
              <strong>Creative & Art Direction, Design:</strong>
              <br />
              Julen Saenz
              <br />
              Michael Mason
            </p>
            <p className="mt-4 text-sm leading-4">
              <strong>Photography</strong>
              <br />
              Cate Underwood
            </p>
            <p className="mt-4 text-sm leading-4">
              <strong>Animation</strong>
              <br />
              Aharón Ferradas
            </p>
            <p className="mt-4 text-sm leading-4">
              <strong>Coaster Illustrations:</strong>
              <br />
              T.O.T Studio
            </p>
          </div>
        </Grid>
      </Container>
    </section>
  )
}
