import clsx from 'clsx'
import { Checkbox as BaseCheckbox } from 'components/Atoms'
import Image from 'next/image'
import tibiaCoinSrc from 'assets/tibiacoin.png'
import { ExpandIcon } from 'assets/svgs'
import styles from './styles.module.css'
import { WrapperProps, FlexColumnProps, BodyProps } from './types'

export const Wrapper = ({
  highlighted = false,
  style,
  className,
  ...props
}: WrapperProps) => (
  <article
    className={clsx(
      'card p-4',
      highlighted && `${styles.highlightedPalette} z-2 md:animate-zoomInAndOut`,
      props.role === 'button' && 'cursor-pointer',
      className,
    )}
    style={{ animationDelay: '1s', ...style }}
    {...props}
  />
)

export const Icons = {
  Expand: () => <ExpandIcon className="fill-onSurface transition-colors" />,
  TibiaCoin: () => (
    <Image
      src={tibiaCoinSrc}
      alt="Tibia Coin"
      unoptimized
      width={12}
      height={12}
    />
  ),
}

export const InfoGrid = ({
  className,
  ...props
}: JSX.IntrinsicElements['div']) => (
  <div
    className={clsx('grid grid-cols-2 gap-x-2 gap-y-3', className)}
    {...props}
  />
)

export const FlexFooter = ({
  className,
  style,
  ...props
}: JSX.IntrinsicElements['div']) => (
  <div
    className={clsx(
      'border-separator grid grid-cols-2 items-start gap-8 pt-3',
      className,
    )}
    style={{
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      ...style,
    }}
    {...props}
  />
)

export const FlexColumn = ({
  storeColumn = false,
  className,
  ...props
}: FlexColumnProps) => (
  <div
    className={clsx(
      'text-onSurface child:w-fit flex h-full flex-col gap-2',
      storeColumn && 'child:h-[18px]',
      className,
    )}
    {...props}
  />
)

export const Checkbox: typeof BaseCheckbox = ({ checked, ...props }) => (
  <BaseCheckbox
    disabled
    aria-readonly
    enabledStyle={checked}
    checked={checked}
    {...props}
  />
)

export const CheckboxContainer = ({
  className,
  ...props
}: JSX.IntrinsicElements['div']) => (
  <div
    className={clsx('grid h-4 w-4 place-items-center', className)}
    {...props}
  />
)

export const Strong = ({
  className,
  ...props
}: JSX.IntrinsicElements['strong']) => (
  <strong className={clsx('text-rare text-tsm', className)} {...props} />
)

export const Body = ({ lazy = false, className, ...props }: BodyProps) => (
  <div
    className={clsx('mb-3 grid gap-3 pt-1.5', lazy && styles.lazy, className)}
    {...props}
  />
)
