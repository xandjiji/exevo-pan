import { memo } from 'react'

const Ul = memo(
  ({ ...props }: Omit<JSX.IntrinsicElements['ul'], 'className'>) => (
    <ul
      className="text-s ml-4 grid list-disc justify-items-start gap-1"
      {...props}
    />
  ),
)

const Li = memo(
  ({ ...props }: Omit<JSX.IntrinsicElements['li'], 'className'>) => (
    <li className="marker:text-rare text-onSurface" {...props} />
  ),
)

export default { Ul, Li }
