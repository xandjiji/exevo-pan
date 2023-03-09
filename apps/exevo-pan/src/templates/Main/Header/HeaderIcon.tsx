import clsx from 'clsx'

type HeaderIconProps = {
  icon: JSX.Element
  spaced?: boolean
}

export default ({ icon, spaced = false }: HeaderIconProps) => (
  <div
    className={clsx(
      'child:fill-onPrimary child:w-full child:h-full h-[18px] w-[18px]',
      spaced && 'mr-1.5',
    )}
  >
    {icon}
  </div>
)
