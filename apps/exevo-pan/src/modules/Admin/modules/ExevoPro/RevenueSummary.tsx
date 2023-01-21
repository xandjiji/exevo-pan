import { RevenueSummary } from 'modules/Admin/components'
import { trpc } from 'lib/trpc'

export default () => {
  const { data } = trpc.proRevenue.useQuery(undefined, {
    refetchOnWindowFocus: false,
  })

  return <RevenueSummary {...data} />
}
