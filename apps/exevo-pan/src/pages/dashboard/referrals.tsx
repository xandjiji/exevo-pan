import { useRef, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Main } from 'templates'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { Layout } from 'modules/Dashboard'
import {
  CouponPreview,
  ReferralHistory,
} from 'modules/Dashboard/modules/Referrals'
import { Button, Chip, Input, Text, TitledCard } from 'components/Atoms'
import { TrashIcon } from 'assets/svgs'
import { toast } from 'react-hot-toast'

import { PreviewImageClient } from 'services'
import { trpc } from 'lib/trpc'
import {
  buildPageTitle,
  buildUrl,
  calculateDiscountedExevoProPrice,
  randomCharacter,
} from 'utils'
import { exevoPro, jsonld, routes } from 'Constants'
import { common, dashboard } from 'locales'

const pageUrl = buildUrl(routes.DASHBOARD.REFERRALS)

// @ ToDo:
// history
// only for pro members (add free state)
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

  const historyFirstPage = trpc.listMyReferralHistoryEntries.useQuery({})

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
        <Layout
          isLoading={
            list.isLoading &&
            referralTag.isLoading &&
            historyFirstPage.isLoading
          }
        >
          <div className="lgr:grid-cols-[520px_320px] mx-auto grid max-w-[320px] gap-4 md:max-w-fit md:grid-cols-[320px_320px] lg:grid-cols-[460px_320px]">
            <TitledCard variant="rounded" title="Summary">
              <div className="text-tsm flex flex-col gap-4">
                <ul className="marker:text-primaryHighlight grid list-inside list-disc gap-1.5">
                  <li>
                    Using your coupon, users will receive a{' '}
                    <span className="code py-1 px-2">
                      {exevoPro.referral.discountPercent}%
                    </span>{' '}
                    discount on their{' '}
                    <strong className="rare-gradient-text">Exevo Pro</strong>{' '}
                    purchase, which is worth{' '}
                    <span className="code py-1 px-2">
                      <Text.TibiaCoin
                        value={
                          exevoPro.price.TIBIA_COINS -
                          calculateDiscountedExevoProPrice(
                            exevoPro.referral.discountPercent,
                            'TIBIA_COINS',
                          )
                        }
                      />{' '}
                      / R$
                      {exevoPro.price.PIX -
                        calculateDiscountedExevoProPrice(
                          exevoPro.referral.discountPercent,
                          'PIX',
                        )}
                      ,00
                    </span>{' '}
                    on their checkout price.
                  </li>

                  <li>
                    For every purchase completed with your coupon, you&apos;ll
                    earn{' '}
                    <span className="code py-1 px-2">
                      <Text.TibiaCoin value={exevoPro.referral.tcCommission} />
                    </span>{' '}
                    as a flat comission.
                  </li>

                  <li>
                    There are no limits or minimum requirement for withdraws. It
                    may take up to 24 hours to receive your Tibia Coins.
                  </li>
                </ul>

                <span>
                  Current balance:{' '}
                  <Chip className="mt-1 w-fit">
                    <Text.TibiaCoin value={referralTag.data?.tcIn ?? 0} />
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

            <div className="col-span-full">
              <ReferralHistory firstPageData={historyFirstPage.data ?? []} />
            </div>
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
