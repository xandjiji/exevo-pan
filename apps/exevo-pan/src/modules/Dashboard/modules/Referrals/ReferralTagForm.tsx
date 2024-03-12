import clsx from 'clsx'
import { routes } from 'Constants'
import { ExevoPanIcon } from 'assets/svgs'
import { Button, Input, TitledCard } from 'components/Atoms'

// @ ToDo:
// download endpoint?
// copy button (and about blank)
// gringo influencers
// enter submit, enter submit for exevo pro

type ReferralTagFormProps = {
  couponValue: string
  onCouponValueChange: (value: string) => void
  onSubmit: () => void
}

const couponExample = () => {
  const samples = [
    'MP3PLAYER',
    'NATTANK',
    'RUBINI',
    'TIBIAEMPREGO',
    'REVEL',
    'NALU',
    'BUGADINHO',
    'VEXCRAW',
  ]

  return samples[Math.floor(Math.random() * samples.length)]
}

export const ReferralTagForm = ({
  couponValue,
  onCouponValueChange,
  onSubmit,
}: ReferralTagFormProps) => {
  const refLink = `https://exevopan.com${routes.EXEVOPRO}?ref=${
    couponValue || 'COUPON'
  }`

  return (
    <TitledCard variant="rounded" title="My coupon">
      <div className="flex items-end gap-2">
        <Input
          label="Customize coupon"
          placeholder={`e.g, '${couponExample()}'`}
          maxLength={16}
          allowClear
          className="grow"
          value={couponValue}
          onChange={(e) => onCouponValueChange(e.target.value.toUpperCase())}
        />

        <Button pill className="mb-[1px] py-3" onClick={onSubmit}>
          Save
        </Button>
      </div>

      <p className="mt-4 mb-2">Preview:</p>

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
            <span
              className={clsx('text-xs', couponValue.length < 12 && '-ml-4')}
            >
              Using:
            </span>
            <span className="bg-primaryVariantHighlight/40 border-1 border-primaryHighlight/60 text-tsm text-onSurface rounded border-dashed px-2 py-1 font-bold">
              {couponValue || 'COUPON'}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <p className="mb-0.5 text-xs tracking-wide">Referral link:</p>
        <a
          href={refLink}
          className="text-primaryHighlight text-tsm font-bold underline underline-offset-2"
        >
          {refLink}
        </a>
      </div>
    </TitledCard>
  )
}
