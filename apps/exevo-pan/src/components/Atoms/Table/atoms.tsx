import clsx from 'clsx'
import styled, { css } from 'styled-components'
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

export const Row = ({ className, ...props }: JSX.IntrinsicElements['tr']) => (
  <tr
    className={clsx(
      'styled-link after:bg-separator relative after:absolute after:top-full after:left-0 after:h-[1px] after:w-full after:opacity-30 last:after:content-none',
      className,
    )}
    {...props}
  />
)

export const Head = (args: JSX.IntrinsicElements['thead']) => (
  <thead style={{ borderBottom: 'solid 1px var(--separator)' }} {...args} />
)

export const HeadColumn = ({
  highlighted = false,
  desc = false,
  className,
  ...props
}: HeadColumnProps) => (
  <th
    className={clsx(
      'text-tsm text-onSurface pb-[6px] font-bold',
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
    className={clsx('text-s text-onSurface py-[6px] font-light', className)}
    {...props}
  />
)
