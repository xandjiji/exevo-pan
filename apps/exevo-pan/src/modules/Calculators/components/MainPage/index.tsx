import { useTranslations } from 'contexts/useTranslation'
import { SpritePortrait } from 'components/Atoms'
import { Main } from '../layout'
import { MainPageEntry } from './types'

/* @ ToDo:
- page title
- src de cada um (usar sprite portrait?)
- route click
*/

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
    <Main>
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
    </Main>
  )
}

export default MainPage
