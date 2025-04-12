/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-underscore-dangle */
import { loadOutfitSrc } from 'utils'
import clsx from 'clsx'
import { links } from 'Constants'
import { templateMessage, useTranslations } from 'contexts/useTranslation'
import { Chip, SpritePortrait, Text } from 'components/Atoms'

const { TIBIA_BOUNTY: TIBIA_BOUNTY_URL } = links

type TibiaTradeBannerProps = {
  items: TibiaBountyEntry[]
} & React.ComponentPropsWithoutRef<'section'>

const Item = ({ item }: { item: TibiaBountyEntry }) => (
  <a
    className="card group flex items-center gap-4"
    href={`https://www.tibiabounty.com/bounties/${item._id}`}
    target="_blank"
    rel="noopener external nofollow"
  >
    <SpritePortrait
      src={loadOutfitSrc(item.target.look_id)}
      alt={item.target.name}
      width={64}
      height={64}
      className="relative top-0 transition-all group-hover:-top-0.5"
      offset
    />

    <div className="grid gap-2">
      <strong className="text-tsm tracking-wide">{item.target.name}</strong>

      <div className="flex items-center gap-2">
        <Chip>Lv.{item.target.level}</Chip>
        <Chip>{item.target.world.name}</Chip>
        <Chip>
          <Text.TibiaCoin value={item.value} />
        </Chip>
      </div>
    </div>
  </a>
)

export const TibiaBountyBanner = ({
  items,
  className,
  ...props
}: TibiaTradeBannerProps) => {
  const { homepage } = useTranslations()
  const i18n = homepage.AuctionsGrid.TibiaBountyBanner

  return (
    <section className={clsx('relative grid gap-2', className)} {...props}>
      <div className="z-1 from-background pointer-events-none absolute bottom-0 right-0 h-full w-8 bg-gradient-to-l to-transparent" />

      <p className="text-tsm font-light">
        {templateMessage(i18n.heading, {
          link: (
            <a
              href={TIBIA_BOUNTY_URL}
              target="_blank"
              rel="noopener external nofollow"
              className="text-primaryHighlight font-bold tracking-wide"
            >
              Tibia Bounty
            </a>
          ),
        })}
      </p>

      <div className="hidden-scrollbar flex w-full gap-4 overflow-auto pr-8 pb-2">
        {items.map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Item key={idx} item={item} />
        ))}
      </div>
    </section>
  )
}
