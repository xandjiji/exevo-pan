import clsx from 'clsx'
import { SectionProps } from './types'

export const Spacer = ({
  className,
  ...props
}: JSX.IntrinsicElements['div']) => (
  <div className={clsx('grid gap-4', className)} {...props} />
)

export const Section = ({
  border = false,
  className,
  style,
  ...props
}: SectionProps) => (
  <Spacer
    className={clsx('border-b-separator pb-3', className)}
    style={{
      borderBottomStyle: 'solid',
      borderBottomWidth: border ? '0.5px' : 0,
      ...style,
    }}
    {...props}
  />
)

export const SpriteSection = (args: JSX.IntrinsicElements['div']) => (
  <Section className="!flex w-full flex-wrap !gap-3 pt-3" {...args} />
)

export const TooltipSection = (args: JSX.IntrinsicElements['div']) => (
  <Section
    border
    className="child:w-fit grid grid-cols-1 !gap-2 md:border-b-transparent md:pb-0"
    {...args}
  />
)

export const SpriteSectionDivisor = (args: JSX.IntrinsicElements['div']) => (
  <div
    className="border-b-separator text-tsm py-1.5"
    style={{
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
    }}
    {...args}
  />
)
