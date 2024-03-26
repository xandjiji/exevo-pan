import Head from 'next/head'
import { Template } from 'modules/Admin'
import { ReferralWithdraws } from 'modules/Admin/modules/ReferralWithdraws'
import { GetStaticProps } from 'next'
import { buildPageTitle } from 'utils'
import { common } from 'locales'

export default function Admin() {
  const pageTitle = buildPageTitle('Withdraws')

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Template>
        <div className="mx-auto grid max-w-xl gap-4">
          <ReferralWithdraws />
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
