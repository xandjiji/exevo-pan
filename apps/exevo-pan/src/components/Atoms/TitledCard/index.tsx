import clsx from 'clsx'

type TitledCardProps = {
  title: React.ReactNode
} & Omit<JSX.IntrinsicElements['div'], 'title'>

const TitledCard = ({
  title,
  children,
  className,
  ...props
}: TitledCardProps) => (
  <div className={clsx(className, 'card rounded-xl p-0')} {...props}>
    <div className="bg-primary text-onPrimary rounded-t-xl px-6 py-3 text-2xl">
      {title}
    </div>
    {children}
  </div>
)

export default TitledCard
