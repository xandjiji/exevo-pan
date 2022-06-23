/* eslint-disable jsx-a11y/anchor-is-valid */
import { useTranslations } from 'contexts/useTranslation'
import NextLink from 'next/link'
import { SpritePortrait } from 'components/Atoms'
import { routes } from 'Constants'
import { MainPageEntry } from './types'

const entries: MainPageEntry[] = [
  {
    name: 'ExerciseWeapons',
    thumbnail: 'sprites/store/lasting exercise sword.gif',
    href: routes.EXERCISE_WEAPONS,
  },
  {
    name: 'LowBlow',
    thumbnail: 'sprites/charms/Low Blow.png',
    href: routes.LOW_BLOW,
  },
]

const MainPage = () => {
  const {
    translations: { calculators },
  } = useTranslations()

  return (
    <main className="inner-container pb-4 md:pb-8">
      <ul className="grid gap-4">
        {entries.map(({ name, thumbnail, href }) => (
          <li key={name}>
            <NextLink href={href}>
              <a className="card group flex items-center gap-4">
                <SpritePortrait
                  src={thumbnail}
                  width={32}
                  height={32}
                  alt={calculators.Meta[name].title}
                  className="relative left-0 transition-all group-hover:left-[3px]"
                />

                <div className="grid gap-1.5">
                  <h3 className="text-primaryHighlight text-base tracking-wide">
                    {calculators.Meta[name].title}
                  </h3>
                  <p className="text-tsm font-light">
                    {calculators.Meta[name].description}
                  </p>
                </div>
              </a>
            </NextLink>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default MainPage
