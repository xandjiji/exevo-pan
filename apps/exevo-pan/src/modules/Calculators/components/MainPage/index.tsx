/* eslint-disable jsx-a11y/anchor-is-valid */
import { useTranslations } from 'contexts/useTranslation'
import NextLink from 'next/link'
import { SpritePortrait } from 'components/Atoms'
import { routes } from '../../routes'

const [main, ...entries] = routes

const MainPage = () => {
  const {
    translations: { calculators },
  } = useTranslations()

  return (
    <main className="inner-container pb-4 md:pb-8">
      <ul className="grid gap-4">
        {entries.map(({ title, href, sprite }) => (
          <li key={title}>
            <NextLink href={href}>
              <a className="card group flex items-center gap-4">
                <SpritePortrait
                  src={sprite}
                  width={32}
                  height={32}
                  alt={calculators.Meta[title].title}
                  className="relative left-0 transition-all group-hover:left-[3px]"
                />

                <div className="grid gap-1.5">
                  <h3 className="text-primaryHighlight text-base tracking-wide">
                    {calculators.Meta[title].title}
                  </h3>
                  <p className="text-tsm font-light">
                    {calculators.Meta[title].description}
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