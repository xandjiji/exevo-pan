import Head from 'next/head'
import { Title } from 'components/Meta'
import { Main } from 'templates'
import ErrorPage from 'modules/ErrorPage'

export default function Custom404(): JSX.Element {
  return (
    <div>
      <Head>
        <Title content="Exevo Pan - 404" />
      </Head>

      <Main>
        <ErrorPage />
      </Main>
    </div>
  )
}
