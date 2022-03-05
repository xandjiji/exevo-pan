import { useMemo } from 'react'
import { Checkbox } from 'components/CharacterCard/styles'
import { addonCheck } from './utils'
import { testRareOutfit } from './rareOutfitCheck'
import * as S from './styles'
import { SpriteBoxProps } from './types'

const SpriteBox = ({
  offset = false,
  name,
  sex,
  src,
  type,
  rareSet,
  checkRareOutfit = false,
}: SpriteBoxProps): JSX.Element => {
  const isRareMount = useMemo(
    () => (rareSet ? rareSet.has(name) : false),
    [name],
  )

  const isRareOutfit = useMemo(
    () =>
      checkRareOutfit && type ? testRareOutfit({ name, type, sex }) : false,
    [name, type, sex],
  )

  const isRare = isRareMount || isRareOutfit
  const showAddon = type !== undefined

  return (
    <S.Wrapper title={name} data-rare={isRare} data-show-addon={showAddon}>
      <S.SpritePortrait
        offset={offset}
        alt={name}
        src={src}
        width={64}
        height={64}
      />

      {showAddon && (
        /* @ ToDo: i18n */
        <S.CheckboxWrapper>
          <Checkbox aria-label="First addon" checked={addonCheck.first(type)} />
          <Checkbox
            aria-label="Second addon"
            checked={addonCheck.second(type)}
          />
        </S.CheckboxWrapper>
      )}
    </S.Wrapper>
  )
}

export default SpriteBox
