import { useTranslations } from 'contexts/useTranslation'
import { SpritePortrait } from 'components/Atoms'
import { MainPageEntry } from './types'

const entries: MainPageEntry[] = [
  {
    name: 'ExerciseWeapons',
    thumbnail: 'sprites/store/lasting exercise sword.gif',
  },
  {
    name: 'ExerciseWeapons',
    thumbnail: 'sprites/store/lasting exercise sword.gif',
  },
  {
    name: 'ExerciseWeapons',
    thumbnail: 'sprites/store/lasting exercise sword.gif',
  },
]

const MainPage = () => {
  const {
    translations: { calculators },
  } = useTranslations()

  return (
    <main className="inner-container pb-4 md:pb-8">
      <div className="grid gap-4">
        {entries.map(({ name, thumbnail }) => (
          <div key={name} className="card flex items-center gap-4">
            <SpritePortrait
              src={thumbnail}
              width={32}
              height={32}
              alt={calculators.Meta[name].title}
            />

            <div className="grid gap-1.5">
              <h3 className="text-primaryHighlight text-base tracking-wide">
                {calculators.Meta[name].title}
              </h3>
              <p className="text-tsm font-light">
                {calculators.Meta[name].description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default MainPage
