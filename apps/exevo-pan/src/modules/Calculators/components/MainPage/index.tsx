import { useTranslations } from 'contexts/useTranslation'
import Image from 'next/image'
import asdSrc from 'assets/herofood.png'
import { Main } from '../layout'
import { MainPageEntry } from './types'

/* @ ToDo:
- page title
- src de cada um (usar sprite portrait?)
- route click
*/

const entries: MainPageEntry[] = [
  { name: 'ExerciseWeapons', thumbnail: asdSrc },
  { name: 'ExerciseWeapons', thumbnail: asdSrc },
  { name: 'ExerciseWeapons', thumbnail: asdSrc },
  { name: 'ExerciseWeapons', thumbnail: asdSrc },
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
            <div className="shrink-0">
              <Image
                src={thumbnail}
                alt={calculators.Meta[name].title}
                width={64}
                height={64}
                unoptimized
              />
            </div>

            <div className="grid gap-1.5">
              <h3 className="text-2xl">{calculators.Meta[name].title}</h3>
              <p className="text-tsm">{calculators.Meta[name].description}</p>
            </div>
          </div>
        ))}
      </div>
    </Main>
  )
}

export default MainPage
