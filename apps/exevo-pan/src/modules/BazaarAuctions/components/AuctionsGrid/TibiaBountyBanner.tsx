/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-underscore-dangle */
import { loadOutfitSrc } from 'utils'
import clsx from 'clsx'
import { links } from 'Constants'
import { templateMessage, useTranslations } from 'contexts/useTranslation'
import { Chip, SpritePortrait, Text } from 'components/Atoms'
import { ServerIcon } from 'assets/svgs'

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
    <div className="relative">
      <SpritePortrait
        src={loadOutfitSrc(item.target.look_id)}
        alt={item.target.name}
        width={64}
        height={64}
        className="relative top-0 transition-all group-hover:-top-0.5"
        offset
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute top-1/2 left-1/2 h-8 w-8 stroke-[#dc2626]"
        style={{
          transform: 'translate(-50%,-50%)',
          filter: 'drop-shadow(0 0 2px #00000080)',
        }}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="22" x2="18" y1="12" y2="12" />
        <line x1="6" x2="2" y1="12" y2="12" />
        <line x1="12" x2="12" y1="6" y2="2" />
        <line x1="12" x2="12" y1="22" y2="18" />
      </svg>
    </div>

    <div className="grid gap-2">
      <strong className="text-tsm tracking-wide">{item.target.name}</strong>

      <div className="flex items-center gap-2">
        <Chip>Lv.{item.target.level}</Chip>
        <Chip>
          <ServerIcon className="fill-onSurface -mr-0.5 h-4 w-4" />{' '}
          {item.target.world.name}
        </Chip>
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
