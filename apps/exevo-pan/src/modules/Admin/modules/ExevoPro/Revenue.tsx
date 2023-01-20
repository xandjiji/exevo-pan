import { trpc } from 'lib/trpc'

const INITIAL_VALUE = 'R$ 0,00'

const Revenue = () => {
  const { data } = trpc.proRevenue.useQuery(undefined, {
    refetchOnWindowFocus: false,
    placeholderData: {
      monthly: INITIAL_VALUE,
      average: INITIAL_VALUE,
      total: INITIAL_VALUE,
    },
  })

  return (
    <section className="card flex flex-col gap-4 px-6 py-4 sm:flex-row sm:gap-8">
      <div className="grid gap-1">
        <span className="text-base font-light">Current month</span>
        <strong className="text-2xl">{data?.monthly}</strong>
      </div>

      <div className="grid gap-1">
        <span className="text-base font-light">Total monthly average</span>
        <strong className="text-2xl">{data?.average}</strong>
      </div>

      <div className="grid gap-1">
        <span className="text-base font-light">Total</span>
        <strong className="text-2xl">{data?.total}</strong>
      </div>
    </section>
  )
}

export default Revenue
