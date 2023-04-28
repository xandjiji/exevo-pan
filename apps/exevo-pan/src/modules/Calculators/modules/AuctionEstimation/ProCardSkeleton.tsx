import { memo } from 'react'
import { Skeleton, RareFrame } from 'components/Atoms'
import { ExevoPanIcon } from 'assets/svgs'

export const ProCardSkeleton = memo(() => (
  <div className="card relative flex items-center gap-4 opacity-50">
    <RareFrame />
    <Skeleton className="grid h-14 w-14 shrink-0 place-content-center rounded-md">
      <ExevoPanIcon className="h-6 w-6" />
    </Skeleton>

    <div className="grid gap-1.5">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-3 w-36" />
    </div>
  </div>
))
