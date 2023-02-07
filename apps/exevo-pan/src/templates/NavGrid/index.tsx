import { memo } from 'react'
import NextLink from 'next/link'
import { SpritePortrait } from 'components/Atoms'

export type NavGridItem = {
  href: string
  sprite: string
  title: string
  description: string
}

type NavGridProps = {
  navItems: NavGridItem[]
}

const NavGrid = ({ navItems }: NavGridProps) => (
  <main className="inner-container z-1 pb-4 md:pb-8">
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {navItems.map(({ title, description, href, sprite }) => (
        <li key={title}>
          <NextLink
            href={href}
            className="card group flex h-full items-center gap-4"
          >
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
          </NextLink>
        </li>
      ))}
    </ul>
  </main>
)

export default memo(NavGrid)
