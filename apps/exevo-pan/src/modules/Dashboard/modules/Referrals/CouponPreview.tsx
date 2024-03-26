import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { exevoPro, routes } from 'Constants'
import { ExevoPanIcon } from 'assets/svgs'
import { CopyButton } from 'components/Atoms'

type CouponPreviewProps = {
  coupon: string
  isInvalid: boolean
}

export const CouponPreview = ({ coupon, isInvalid }: CouponPreviewProps) => {
  const translations = useTranslations()
  const i18n = translations.dashboard.Referrals.CouponPreview

  const derivedCoupon = coupon || 'COUPON'
  const refLink = `https://exevopan.com${routes.EXEVOPRO}?${exevoPro.referral.urlParam}=${derivedCoupon}`

  return (
    <div>
      <p className="mt-4 mb-2">{i18n.preview}</p>

      <div className="border-1 border-separator/60 flex items-center gap-4 rounded border-dashed py-3 px-4">
        <ExevoPanIcon width={60} height={60} className="shrink-0" />

        <div className="grid gap-3">
          <strong className="text-txl whitespace-nowrap text-center tracking-wide">
            <strong className="rare-gradient-text">Exevo Pro</strong>{' '}
            <span className="text-primaryHighlight decoration-primaryHighlight/60 tracking-wider underline decoration-dashed underline-offset-4">
              10% OFF
            </span>
          </strong>

          <div className="flex items-center justify-center gap-1.5">
            <span className={clsx('text-xs', coupon.length < 12 && '-ml-4')}>
              Using:
            </span>
            <span className="bg-primaryVariantHighlight/40 border-1 border-primaryHighlight/60 text-tsm text-onSurface rounded border-dashed px-2 py-1 font-bold">
              {derivedCoupon}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <p className="mb-0.5 text-xs tracking-wide">{i18n.referralLink}</p>
        <div className="flex items-center gap-2">
          <a
            href={refLink}
            className="text-primaryHighlight text-tsm font-bold underline underline-offset-2"
          >
            {refLink}
          </a>
          {!isInvalid && <CopyButton copyString={refLink} variant="small" />}
        </div>
      </div>
    </div>
  )
}
