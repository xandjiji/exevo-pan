import Head from 'next/head'
import { Template } from 'modules/Admin'
import { RevenueSummary, PaymentList } from 'modules/Admin/modules/ExevoPro'
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
          <RevenueSummary />
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
