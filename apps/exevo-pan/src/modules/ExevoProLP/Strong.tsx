/* eslint-disable react/require-default-props */
import { memo } from 'react'
import clsx from 'clsx'

type StrongProps = { highlight?: boolean } & JSX.IntrinsicElements['strong']

const Strong = ({ highlight = false, className, ...props }: StrongProps) => (
  <strong
    className={clsx(
      className,
      'text-rare whitespace-nowrap',
      highlight &&
        'decoration-rare/30 underline decoration-wavy underline-offset-4',
    )}
    {...props}
  />
)

export default memo(Strong)
