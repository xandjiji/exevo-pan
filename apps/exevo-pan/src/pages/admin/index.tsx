import Head from 'next/head'
import { Template, Revenue, PaymentList } from 'modules/Admin'
import { GetStaticProps } from 'next'
import { buildPageTitle } from 'utils'
import { common } from 'locales'

export default function Admin() {
  const pageTitle = buildPageTitle('Admin')

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Template>
        <div className="mx-auto grid max-w-3xl gap-4">
          <Revenue />
          <PaymentList />
        </div>
      </Template>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    translations: {
      common: common[locale as RegisteredLocale],
    },
  },
})
