import { memo } from 'react'
import { SpritePortrait } from 'components/Atoms'
import { useLocalizedHref } from 'hooks/useLocalizedHref'

export type NavGridItem = {
  href: string
  sprite: string
  title: string
  description: string
}

type NavGridProps = {
  navItems: NavGridItem[]
}

function Link({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={useLocalizedHref(href)}
      className="card group flex h-full items-center gap-4"
    >
      {children}
    </a>
  )
}

const NavGrid = ({ navItems }: NavGridProps) => (
  <div className="inner-container z-1 pb-4 md:pb-8">
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {navItems.map(({ title, description, href, sprite }) => (
        <li key={title}>
          <Link href={href}>
            <SpritePortrait
              src={sprite}
              width={32}
              height={32}
              alt={title}
              className="relative left-0 transition-all group-hover:left-[3px]"
            />

            <div className="grid gap-1.5">
              <h2 className="text-primaryHighlight text-base tracking-wide">
                {title}
              </h2>
              <p className="text-tsm font-light">{description}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default memo(NavGrid)
