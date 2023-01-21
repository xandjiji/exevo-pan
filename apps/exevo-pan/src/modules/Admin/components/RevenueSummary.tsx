import { memo } from 'react'

const FALLBACK_VALUE = 'R$ 0,00'

type RevenueSummaryProps = {
  monthly?: string
  average?: string
  total?: string
}

const RevenueSummary = ({
  monthly = FALLBACK_VALUE,
  average = FALLBACK_VALUE,
  total = FALLBACK_VALUE,
}: RevenueSummaryProps) => (
  <section className="card flex flex-col gap-4 px-6 py-4 sm:flex-row sm:gap-8">
    <div className="grid gap-1">
      <span className="text-base font-light">Current month</span>
      <strong className="text-2xl">{monthly}</strong>
    </div>

    <div className="grid gap-1">
      <span className="text-base font-light">Total monthly average</span>
      <strong className="text-2xl">{average}</strong>
    </div>

    <div className="grid gap-1">
      <span className="text-base font-light">Total</span>
      <strong className="text-2xl">{total}</strong>
    </div>
  </section>
)
export default memo(RevenueSummary)
