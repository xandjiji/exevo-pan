import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import Image from 'next/image'
import { links } from 'Constants'
import { Chip, SpritePortrait, Text } from 'components/Atoms'
import yellowSrc from 'assets/yellowbattleye.png'
import greenSrc from 'assets/greenbattleye.png'

// @ ToDo:
// i18n

type TibiaTradeBannerProps = {
  items: TibiaTradeHighlightedItem[]
} & React.ComponentPropsWithoutRef<'section'>

const TIBIA_TRADE_BASE_URL = links.TIBIA_TRADE

const resolve = {
  link: (item: TibiaTradeHighlightedItem) => {
    const base = `${TIBIA_TRADE_BASE_URL}/trade`
    if (item.house_id === null) {
      return `${base}/${item.item_name.replaceAll(' ', '-')}-${item.id}`
    }

    return `${base}/${item.house_name.replaceAll(' ', '-')}-${item.id}`
  },
  imgSrc: (item: TibiaTradeHighlightedItem) => {
    const base = `${TIBIA_TRADE_BASE_URL}/images`
    if (item.house_id === null) {
      return `${base}/item/${item.item_name.replaceAll(' ', '_')}.gif`
    }

    return `${base}/house/location/${item.tibia_id}`
  },
}

export const Item = ({ item }: { item: TibiaTradeHighlightedItem }) => (
  <a
    className="card flex items-center gap-4"
    href={resolve.link(item)}
    target="_blank"
    rel="noopener external nofollow noreferrer"
  >
    <SpritePortrait
      src={resolve.imgSrc(item)}
      alt="Sanguine Bow"
      width={32}
      height={32}
    />

    <div className="grid gap-2">
      <strong className="text-tsm tracking-wide">Sanguine Bow</strong>

      <div className="flex items-center gap-2">
        <Chip>Vendendo</Chip>
        <Chip>
          <Image
            role="none"
            alt="Green BattlEye"
            className="pixelated"
            src={greenSrc}
          />{' '}
          Utobra
        </Chip>
        <Chip>
          <Text.TibiaCoin value={24000} />
        </Chip>
      </div>
    </div>
  </a>
)

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
        {items.map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Item key={idx} item={item} />
        ))}
      </div>
    </section>
  )
}
