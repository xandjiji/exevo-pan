import { RevenueSummary } from 'modules/Admin/components'
import { trpc } from 'lib/trpc'

export default () => {
  const { data } = trpc.highlightRevenue.useQuery(undefined, {
    refetchOnWindowFocus: false,
  })

  return <RevenueSummary {...data} />
}
