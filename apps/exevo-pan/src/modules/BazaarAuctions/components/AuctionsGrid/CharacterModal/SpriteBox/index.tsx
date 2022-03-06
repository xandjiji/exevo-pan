import { formatNumberWithCommas } from 'utils'
import { Checkbox } from 'components/CharacterCard/styles'
import { addonCheck, testRareOutfit, rareMountSet } from './utils'
import * as S from './styles'
import { SpriteBoxProps } from './types'

const SpriteBox = ({
  offset = false,
  name,
  sex,
  src,
  type,
  amount = 0,
  checkRareMount = false,
  checkRareOutfit = false,
}: SpriteBoxProps): JSX.Element => {
  const isRareMount = checkRareMount ? rareMountSet.has(name) : false
  const isRareOutfit =
    checkRareOutfit && type ? testRareOutfit({ name, type, sex }) : false

  const isRare = isRareMount || isRareOutfit
  const showAddon = type !== undefined

  return (
    <S.Wrapper
      title={amount > 1 ? `${formatNumberWithCommas(amount)}x ${name}` : name}
      data-rare={isRare}
      data-show-addon={showAddon}
    >
      <S.SpritePortrait
        offset={offset}
        alt={name}
        src={src}
        width={offset ? 64 : 32}
        height={offset ? 64 : 32}
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

      {amount > 1 && <S.Count>{amount}</S.Count>}
    </S.Wrapper>
  )
}

export default SpriteBox
