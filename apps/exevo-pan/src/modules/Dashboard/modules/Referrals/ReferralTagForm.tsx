import { useState } from 'react'
import clsx from 'clsx'
import { ExevoPanIcon } from 'assets/svgs'
import { Button, Input, TitledCard } from 'components/Atoms'

// @ ToDo:
// manage state
// save request
// download endpoint?
// copy button

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

export const ReferralTagForm = () => {
  const [coupon, setCoupon] = useState('')

  return (
    <TitledCard variant="rounded" title="My coupon">
      <div className="flex items-end gap-2">
        <Input
          label="Customize coupon"
          placeholder={`e.g, '${couponExample()}'`}
          maxLength={16}
          allowClear
          className="grow"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value.toUpperCase())}
        />

        <Button pill className="mb-[1px] py-3">
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
            <span className={clsx('text-xs', coupon.length < 12 && '-ml-4')}>
              Using:
            </span>
            <span className="bg-primaryVariantHighlight/40 border-1 border-primaryHighlight/60 text-tsm text-onSurface rounded border-dashed px-2 py-1 font-bold">
              {coupon || 'COUPON'}
            </span>
          </div>
        </div>
      </div>
    </TitledCard>
  )
}
