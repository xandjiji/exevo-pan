import clsx from 'clsx'
import { ExevoPanIcon } from 'assets/svgs'

export default ({ coupon }: { coupon: string }) => (
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
          {coupon}
        </span>
      </div>
    </div>
  </div>
)
