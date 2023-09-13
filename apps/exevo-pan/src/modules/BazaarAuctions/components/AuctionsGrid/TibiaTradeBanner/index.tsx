import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { TibiaTrade } from 'components/Atoms'

type TibiaTradeBannerProps = {
  items: number[]
} & React.ComponentPropsWithoutRef<'section'>

export const TibiaTradeBanner = ({
  items,
  className,
  ...props
}: TibiaTradeBannerProps) => {
  console.log(9)

  return (
    <section className={clsx('grid gap-2', className)} {...props}>
      <p className="text-tsm font-light">
        Featured on{' '}
        <a
          target="_blank"
          href="https://tibiatrade.gg/"
          rel="noreferrer"
          className="text-primaryHighlight font-bold tracking-wide"
        >
          TibiaTrade
        </a>
        :
      </p>

      <div className="custom-scrollbar -mb-2 flex w-full gap-4 overflow-auto pb-2">
        <TibiaTrade.ItemAd />
        <TibiaTrade.ItemAd />
        <TibiaTrade.ItemAd />
      </div>
    </section>
  )
}
