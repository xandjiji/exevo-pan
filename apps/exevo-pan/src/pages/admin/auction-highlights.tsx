import Head from 'next/head'
import { Template } from 'modules/Admin'
import { RevenueSummary, Table } from 'modules/Admin/modules/AuctionHighlights'
import { GetStaticProps } from 'next'
import { buildPageTitle } from 'utils'
import { common } from 'locales'

export default function AuctionHighlights() {
  const pageTitle = buildPageTitle('Auction Highlights')

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Template>
        <div className="mx-auto grid max-w-xl gap-4">
          <RevenueSummary />
          <Table />
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
