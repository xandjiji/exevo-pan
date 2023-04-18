import clsx from 'clsx'
import { HeadColumnProps } from './types'

export const Table = ({
  className,
  ...props
}: JSX.IntrinsicElements['table']) => (
  <table
    className={clsx('invisible-caption ml-[-3px] border-collapse', className)}
    style={{ width: 'calc(100% + 3px)' }}
    {...props}
  />
)

export const Row = ({
  highlight,
  hoverHighlight = false,
  className,
  ...props
}: {
  highlight?: 'green' | 'red'
  hoverHighlight?: boolean
} & JSX.IntrinsicElements['tr']) => (
  <tr
    className={clsx(
      hoverHighlight && 'hover:bg-background',
      highlight === 'green' && 'bg-greenHighlight/20',
      highlight === 'red' && 'bg-red/20',
      'styled-link after:bg-separator relative after:absolute after:top-full after:left-0 after:h-[1px] after:w-full after:opacity-30 last:after:content-none',
      className,
    )}
    {...props}
  />
)

export const Head = (args: JSX.IntrinsicElements['thead']) => (
  <thead
    style={{ borderBottom: 'solid 1px rgb(var(--separator))' }}
    {...args}
  />
)

export const HeadColumn = ({
  highlighted = false,
  desc = false,
  className,
  ...props
}: HeadColumnProps) => (
  <th
    className={clsx(
      'text-tsm text-onSurface pb-1.5 font-bold',
      highlighted && 'before:relative before:top-[-1px] before:left-[-3px]',
      highlighted && (desc ? "before:content-['▴']" : "before:content-['▾']"),
      className,
    )}
    {...props}
  />
)

export const Body = (args: JSX.IntrinsicElements['tbody']) => (
  <tbody {...args} />
)

export const Column = ({
  className,
  ...props
}: JSX.IntrinsicElements['td']) => (
  <td
    className={clsx('text-s text-onSurface py-1.5 font-light', className)}
    {...props}
  />
)
