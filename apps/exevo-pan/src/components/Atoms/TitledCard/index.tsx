import clsx from 'clsx'

type TitledCardProps = {
  title: React.ReactNode
  variant: 'rounded' | 'squared'
} & Omit<JSX.IntrinsicElements['div'], 'title'>

const TitledCard = ({
  title,
  variant,
  children,
  className,
  ...props
}: TitledCardProps) => (
  <div
    className={clsx(
      className,
      'card p-0',
      variant === 'rounded' ? 'rounded-xl' : 'rounded',
    )}
    {...props}
  >
    <div
      className={clsx(
        'bg-primary custom-scrollbar text-onPrimary overflow-auto text-2xl shadow transition-colors',
        variant === 'rounded'
          ? 'rounded-t-xl px-6 py-3'
          : 'rounded-t px-6 py-4',
      )}
    >
      {title}
    </div>
    <div className={clsx(variant === 'rounded' ? 'p-3' : 'px-6 py-4')}>
      {children}
    </div>
  </div>
)

export default TitledCard
