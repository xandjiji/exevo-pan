import { useTranslations } from 'contexts/useTranslation'
import { useFilters } from '../../../contexts/useFilters'
import * as S from './styles'
import { SpritePickerProps } from './types'

const a = null

const SpritePicker = ({
  title,
  spriteDirectory,
  directorySuffix = '',
  options,
  filterKey,
}: SpritePickerProps): JSX.Element => {
  const {
    translations: { homepage },
  } = useTranslations()

  const { filterState, updateFilters } = useFilters()

  const selectedCount = (filterState[filterKey] as Set<string>).size

  return (
    <S.Accordion
      title={
        <S.AccordionLabel>
          {title}
          <S.Counter
            aria-label={`${selectedCount} ${
              homepage.FilterDrawer.SpritePicker[
                selectedCount === 1 ? 'item' : 'items'
              ]
            }`}
            aria-hidden={!selectedCount}
          >
            {selectedCount}
          </S.Counter>
        </S.AccordionLabel>
      }
    >
      <S.SpriteGrid>
        {options.map((name) => (
          <S.Portrait
            role="switch"
            title={name}
            aria-checked={(filterState[filterKey] as Set<string>).has(name)}
            onClick={() => updateFilters(filterKey, name)}
          >
            <S.Sprite
              alt={name}
              title={name}
              src={`/sprites/${spriteDirectory}/${name}${directorySuffix}.gif`}
              width="64"
              height="64"
            />
          </S.Portrait>
        ))}
      </S.SpriteGrid>
    </S.Accordion>
  )
}

export default SpritePicker
