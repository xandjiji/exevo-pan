import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { exevoPro, routes } from 'Constants'
import { ExevoPanIcon } from 'assets/svgs'
import { CopyButton, Coupon } from 'components/Atoms'

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

      <Coupon coupon={derivedCoupon} />

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
