import { useState } from 'react'
import Head from 'next/head'
import { Main } from 'templates'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { Layout } from 'modules/Dashboard'
import { ReferralTagForm } from 'modules/Dashboard/modules/Referrals'
import { toast } from 'react-hot-toast'

import { PreviewImageClient } from 'services'
import { trpc } from 'lib/trpc'
import { buildPageTitle, buildUrl } from 'utils'
import { jsonld, routes } from 'Constants'
import { common, dashboard } from 'locales'

const pageUrl = buildUrl(routes.DASHBOARD.REFERRALS)

// @ ToDo:
// referral balance
// withdraw
// only for pro members (add free state)
// meta tags, page title, etc
// i18n
// test conflicting ids

export default function Page() {
  const translations = useTranslations()

  const i18n = translations.dashboard

  const pageName = i18n.Meta.auctionNotifications.title
  const previewSrc = PreviewImageClient.getSrc({
    title: pageName,
  })

  const pageTitle = buildPageTitle(pageName)

  const list = trpc.listMyAuctionNotifications.useQuery(undefined, {
    keepPreviousData: true,
  })

  const [couponValue, setCouponValue] = useState('')

  const referralTag = trpc.getReferralTag.useQuery(undefined, {
    onSuccess: (data) => {
      if (data) setCouponValue(data.id)
    },
  })

  const updateCouponAction = trpc.editCoupon.useMutation({
    onSuccess: () => toast.success('Your coupon was updated!'),
    onError: () => toast.error('Oops! Something went wrong'),
  })

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        <meta
          name="description"
          content={i18n.Meta.auctionNotifications.description}
        />
        <meta
          property="twitter:description"
          content={i18n.Meta.auctionNotifications.description}
        />
        <meta
          property="og:description"
          content={i18n.Meta.auctionNotifications.description}
        />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <meta key="preview-1" property="og:image" content={previewSrc} />
        <meta key="preview-2" property="twitter:image" content={previewSrc} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.LOGIN, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.LOGIN, 'es')}
        />
        <link
          rel="alternate"
          hrefLang="pl"
          href={buildUrl(routes.LOGIN, 'pl')}
        />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: jsonld.standard,
          }}
        />
      </Head>

      <Main>
        <Layout isLoading={list.isLoading && referralTag.isLoading}>
          <div className="grid grid-cols-[1fr_320px] gap-4">
            <ReferralTagForm
              couponValue={couponValue}
              onCouponValueChange={setCouponValue}
              onSubmit={() => updateCouponAction.mutate(couponValue)}
              isLoading={updateCouponAction.isLoading}
            />
          </div>
        </Layout>
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    translations: {
      common: common[locale as RegisteredLocale],
      dashboard: dashboard[locale as RegisteredLocale],
    },
  },
})