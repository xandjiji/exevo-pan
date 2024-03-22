import { useRef, useState } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Main } from 'templates'
import { GetStaticProps } from 'next'
import { useSession } from 'next-auth/react'
import { templateMessage, useTranslations } from 'contexts/useTranslation'
import { Layout } from 'modules/Dashboard'
import {
  CouponPreview,
  ReferralHistory,
} from 'modules/Dashboard/modules/Referrals'
import { Alert, Button, Chip, Input, Text, TitledCard } from 'components/Atoms'
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

  const pageName = i18n.Meta.referrals.title
  const previewSrc = PreviewImageClient.getSrc({
    title: pageName,
  })

  const pageTitle = buildPageTitle(pageName)

  const { data: session, status } = useSession()
  const isPro = !!session?.user.proStatus

  const historyFirstPage = trpc.listMyReferralHistoryEntries.useQuery(
    {},
    { enabled: isPro },
  )

  const [coupon, setCoupon] = useState('')
  const [withdrawCharacter, setWithdrawCharacter] = useState('')
  const [editableWithdraw, setEditableWithdraw] = useState(false)

  const referralTag = trpc.getReferralTag.useQuery(undefined, {
    enabled: isPro,
    onSuccess: (data) => {
      if (!data) return

      setCoupon(data.coupon)
      setWithdrawCharacter(data.withdrawCharacter)
      setEditableWithdraw(!!data.withdrawCharacter)
    },
  })

  const editCouponAction = trpc.editReferralTag.useMutation({
    onSuccess: () => toast.success(i18n.Referrals.couponSuccess),
    onError: () => toast.error(i18n.Referrals.couponError),
  })

  const editWithdrawAction = trpc.editReferralTag.useMutation({
    onSuccess: () => {
      toast.success(i18n.Referrals.withdrawSuccess)
      setEditableWithdraw(true)
    },
    onError: () => toast.error(translations.common.genericError),
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

        <meta name="description" content={i18n.Meta.referrals.description} />
        <meta
          property="twitter:description"
          content={i18n.Meta.referrals.description}
        />
        <meta
          property="og:description"
          content={i18n.Meta.referrals.description}
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
            isPro ? referralTag.isLoading && historyFirstPage.isLoading : false
          }
        >
          <div className="lgr:grid-cols-[520px_320px] mx-auto grid max-w-[320px] gap-4 md:max-w-fit md:grid-cols-[320px_320px] lg:grid-cols-[460px_320px]">
            {!isPro && status === 'authenticated' && (
              <div className="col-span-full">
                <Alert variant="primary">
                  {templateMessage(i18n.Referrals.freeAlert, {
                    exevoPro: (
                      <NextLink
                        href={routes.DASHBOARD.ROOT}
                        className="rare-gradient-text font-bold"
                      >
                        Exevo Pro
                      </NextLink>
                    ),
                  })}
                </Alert>
              </div>
            )}

            <TitledCard variant="rounded" title={i18n.Referrals.summaryTitle}>
              <div className="text-tsm flex flex-col gap-4">
                <ul className="marker:text-primaryHighlight grid list-inside list-disc gap-1.5">
                  <li>
                    {templateMessage(i18n.Referrals.li1, {
                      discount: (
                        <span className="code py-1 px-2">
                          {exevoPro.referral.discountPercent}%
                        </span>
                      ),
                      exevoPro: (
                        <strong className="rare-gradient-text">
                          Exevo Pro
                        </strong>
                      ),
                      value: (
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
                        </span>
                      ),
                    })}
                  </li>

                  <li>
                    {templateMessage(i18n.Referrals.li2, {
                      tc: (
                        <span className="code py-1 px-2">
                          <Text.TibiaCoin
                            value={exevoPro.referral.tcCommission}
                          />
                        </span>
                      ),
                    })}
                  </li>

                  <li>{i18n.Referrals.li3}</li>
                </ul>

                <span>
                  {i18n.Referrals.currentBalance}{' '}
                  <Chip className="mt-1 w-fit">
                    <Text.TibiaCoin value={referralTag.data?.tcIn ?? 0} />
                  </Chip>
                </span>

                <div className="flex items-end gap-2">
                  <Input
                    label={i18n.Referrals.withdrawLabel}
                    placeholder={`e.g, '${placeholderCharacter.current}'`}
                    allowClear
                    className="grow"
                    value={withdrawCharacter}
                    onChange={(e) => setWithdrawCharacter(e.target.value)}
                    disabled={
                      !isPro || editWithdrawAction.isLoading || editableWithdraw
                    }
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
                    disabled={!isPro || withdrawCharacter.length < 2}
                  >
                    {editableWithdraw && <TrashIcon className="h-4 w-4" />}
                    {editableWithdraw
                      ? i18n.Referrals.cancelButton
                      : i18n.Referrals.withdrawButton}
                  </Button>
                </div>
              </div>
            </TitledCard>
            <TitledCard variant="rounded" title={i18n.Referrals.myCouponTitle}>
              <div className="flex items-end gap-2">
                <Input
                  label={i18n.Referrals.customizeCoupon}
                  placeholder={`e.g, '${influencer.current}'`}
                  maxLength={16}
                  allowClear
                  className="grow"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  disabled={!isPro || editCouponAction.isLoading}
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
                  disabled={!isPro || isCouponInvalid}
                >
                  {i18n.Referrals.saveCouponButton}
                </Button>
              </div>

              <CouponPreview coupon={coupon} isInvalid={isCouponInvalid} />
            </TitledCard>

            {isPro && (
              <div className="col-span-full">
                <ReferralHistory firstPageData={historyFirstPage.data ?? []} />
              </div>
            )}
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
