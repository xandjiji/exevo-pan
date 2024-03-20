import { useRef, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Main } from 'templates'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { Layout } from 'modules/Dashboard'
import { CouponPreview } from 'modules/Dashboard/modules/Referrals'
import { Button, Chip, Input, Text, TitledCard } from 'components/Atoms'
import { TrashIcon } from 'assets/svgs'
import { toast } from 'react-hot-toast'

import { PreviewImageClient } from 'services'
import { trpc } from 'lib/trpc'
import { buildPageTitle, buildUrl, randomCharacter } from 'utils'
import { jsonld, routes } from 'Constants'
import { common, dashboard } from 'locales'

const pageUrl = buildUrl(routes.DASHBOARD.REFERRALS)

// @ ToDo:
// add overall rules and informtion
// history
// only for pro members (add free state)
// overall layout
// meta tags, page title, etc
// add pitch line
// boss group alert Referrals
// test conflicting ids
// i18n (check mr diff)

function randomInfluencer(br: boolean) {
  const brazillians = [
    'MP3PLAYER',
    'NATTANK',
    'RUBINI',
    'TIBIAEMPREGO',
    'REVEL',
    'NALU',
    'BUGADINHO',
    'VEXCRAW',
    'VDA',
  ]

  const english = [
    'BUBBAGAME',
    'ERICPSYKIK',
    'VANGORO',
    'PUNIO',
    'MAXIGASHI',
    'HEGAL',
  ]

  const samples = br ? brazillians : english

  return samples[Math.floor(Math.random() * samples.length)]
}

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

  const [coupon, setCoupon] = useState('')
  const [withdrawCharacter, setWithdrawCharacter] = useState('')
  const [editableWithdraw, setEditableWithdraw] = useState(false)

  const referralTag = trpc.getReferralTag.useQuery(undefined, {
    onSuccess: (data) => {
      if (!data) return

      setCoupon(data.coupon)
      setWithdrawCharacter(data.withdrawCharacter)
      setEditableWithdraw(!!data.withdrawCharacter)
    },
  })

  const editCouponAction = trpc.editReferralTag.useMutation({
    onSuccess: () => toast.success('Your coupon was updated!'),
    onError: () => toast.error('This coupon is already taken'),
  })

  const editWithdrawAction = trpc.editReferralTag.useMutation({
    onSuccess: () => {
      toast.success('Withdraw character was saved!')
      setEditableWithdraw(true)
    },
    onError: () => toast.error('Oops! Something went wrong'),
  })

  const { locale } = useRouter()

  const isBr = locale === 'pt'
  const influencer = useRef(randomInfluencer(isBr))
  const placeholderCharacter = useRef(randomCharacter())
  const isCouponInvalid = coupon.length < 3 || coupon.length > 16

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
            <TitledCard variant="rounded" title="Summary">
              <div className="flex flex-col gap-4">
                <span>
                  Current balance:{' '}
                  <Chip gray className="mt-1 w-fit">
                    <Text.TibiaCoin value={referralTag.data?.tcIn ?? 0} />
                  </Chip>
                </span>

                <span>
                  Total withdrawn:{' '}
                  <Chip gray className="mt-1 w-fit">
                    <Text.TibiaCoin value={referralTag.data?.tcOut ?? 0} />
                  </Chip>
                </span>

                <div className="flex items-end gap-2">
                  <Input
                    label="Withdraw coins to"
                    placeholder={`e.g, '${placeholderCharacter.current}'`}
                    allowClear
                    className="grow"
                    value={withdrawCharacter}
                    onChange={(e) => setWithdrawCharacter(e.target.value)}
                    disabled={editWithdrawAction.isLoading || editableWithdraw}
                  />

                  <Button
                    pill
                    hollow={editableWithdraw}
                    className="!py-3"
                    onClick={async () => {
                      if (editableWithdraw) {
                        await editWithdrawAction.mutateAsync({
                          withdrawCharacter: '',
                        })
                        setEditableWithdraw(false)
                        setWithdrawCharacter('')
                        return
                      }

                      editWithdrawAction.mutate({ withdrawCharacter })
                    }}
                    loading={editWithdrawAction.isLoading}
                    disabled={withdrawCharacter.length < 2}
                  >
                    {editableWithdraw && <TrashIcon className="h-4 w-4" />}
                    {editableWithdraw ? 'Cancel' : 'Withdraw'}
                  </Button>
                </div>
              </div>
            </TitledCard>

            <TitledCard variant="rounded" title="My coupon">
              <div className="flex items-end gap-2">
                <Input
                  label="Customize coupon"
                  placeholder={`e.g, '${influencer.current}'`}
                  maxLength={16}
                  allowClear
                  className="grow"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  disabled={editCouponAction.isLoading}
                  onKeyPress={(e) => {
                    if (
                      e.key === 'Enter' &&
                      editCouponAction.isLoading &&
                      !isCouponInvalid
                    ) {
                      editCouponAction.mutate({ coupon })
                    }
                  }}
                />

                <Button
                  pill
                  className="mb-[1px] !py-3"
                  onClick={() => editCouponAction.mutate({ coupon })}
                  loading={editCouponAction.isLoading}
                  disabled={isCouponInvalid}
                >
                  Save
                </Button>
              </div>

              <CouponPreview coupon={coupon} isInvalid={isCouponInvalid} />
            </TitledCard>
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
