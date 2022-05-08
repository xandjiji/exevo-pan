import clsx from 'clsx'
import { CurrentSectionProvider } from '../../../contexts/useCurrentSection'

const Aside = ({ className, ...props }: JSX.IntrinsicElements['aside']) => (
  <aside
    className={clsx(
      'lg:z-5 lgr:max-w-[216px] h-min w-full lg:sticky lg:top-[88px] lg:max-w-[172px] 2xl:max-w-[276px]',
      className,
    )}
    {...props}
  />
)

const Layout = (props: React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <CurrentSectionProvider>
    <div
      className="inner-container relative flex flex-col items-center gap-8 pb-8 md:mx-auto md:max-w-[640px] lg:grid lg:max-w-none lg:grid-cols-[1fr_clamp(45ch,50%,75ch)_1fr] lg:flex-row lg:items-start"
      {...props}
    />
  </CurrentSectionProvider>
)

Layout.Center = ({ className, ...props }: JSX.IntrinsicElements['div']) => (
  <div
    className={clsx('flex max-w-full flex-col gap-8', className)}
    {...props}
  />
)

Layout.Left = ({ className, ...props }: JSX.IntrinsicElements['aside']) => (
  <Aside
    className={clsx(
      'flex flex-col-reverse gap-8 justify-self-end lg:flex-col',
      className,
    )}
    {...props}
  />
)

Layout.Right = ({ className, ...props }: JSX.IntrinsicElements['aside']) => (
  <Aside
    className={clsx('justify-self-left flex flex-col gap-8', className)}
    {...props}
  />
)

export default Layout
