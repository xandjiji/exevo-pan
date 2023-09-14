import clsx from 'clsx'
import { links } from 'Constants'
import { useTranslations } from 'contexts/useTranslation'
import Image from 'next/image'
import { Chip, SpritePortrait, Text } from 'components/Atoms'
import yellowSrc from 'assets/yellowbattleye.png'
import greenSrc from 'assets/greenbattleye.png'

const { TIBIA_TRADE: TIBIA_TRADE_URL } = links
// @ ToDo:
// i18n

type TibiaTradeBannerProps = {
  items: TibiaTradeHighlightedItem[]
} & React.ComponentPropsWithoutRef<'section'>

export const Item = ({ item }: { item: TibiaTradeHighlightedItem }) => (
  <a
    className="card flex items-center gap-4"
    href={item.url}
    target="_blank"
    rel="noopener external nofollow noreferrer"
  >
    <SpritePortrait src={item.imgSrc} alt={item.name} width={32} height={32} />

    <div className="grid gap-2">
      <strong className="text-tsm tracking-wide">{item.name}</strong>

      <div className="flex items-center gap-2">
        <Chip>{item.offer === 'buy' ? 'Comprando' : 'Vendendo'}</Chip>
        <Chip>
          <Image
            role="none"
            alt={item.greenBattleye ? 'Green BattlEye' : 'Yellow BattlEye'}
            src={item.greenBattleye ? greenSrc : yellowSrc}
            className="pixelated"
          />{' '}
          {item.serverName}
        </Chip>
        {item.value !== null && (
          <Chip>
            {item.value.currency === 'tc' && (
              <Text.TibiaCoin value={item.value.price} />
            )}
            {item.value.currency === 'gp' && (
              <Text.GoldCoin value={item.value.price} />
            )}
          </Chip>
        )}
      </div>
    </div>
  </a>
)

export const TibiaTradeBanner = ({
  items,
  className,
  ...props
}: TibiaTradeBannerProps) => (
  <section className={clsx('grid gap-2', className)} {...props}>
    <p className="text-tsm font-light">
      Featured on{' '}
      <a
        href={TIBIA_TRADE_URL}
        target="_blank"
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
