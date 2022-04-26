import { useCallback } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { formatNumberWithCommas } from 'utils'
import { Checkbox } from 'components/CharacterCard/atoms'
import { NotifyErrorClient } from 'services'
import { rareMountSet, testRareOutfit } from '../../Parts/SpecialTags/utils'
import { addonCheck } from './utils'
import * as S from './styles'
import { SpriteBoxProps } from './types'

const SpriteBox = ({
  auctionId,
  offset = false,
  name,
  sex,
  src,
  type,
  amount = 0,
  checkRareMount = false,
  checkRareOutfit = false,
}: SpriteBoxProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const isRareMount = checkRareMount ? rareMountSet.has(name) : false
  const isRareOutfit =
    checkRareOutfit && type ? testRareOutfit({ name, type, sex }) : false

  const isRare = isRareMount || isRareOutfit
  const showAddon = type !== undefined

  const notifyError = useCallback(
    () => NotifyErrorClient.setMessage({ auctionId, name, src }),
    [auctionId, name, src],
  )

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
        onError={notifyError}
      />

      {showAddon && (
        <S.CheckboxWrapper>
          <Checkbox
            aria-label={
              common.CharacterCard.CharacterModal.SpriteBox.firstAddon
            }
            checked={addonCheck.first(type ?? 0)}
          />
          <Checkbox
            aria-label={
              common.CharacterCard.CharacterModal.SpriteBox.secondAddon
            }
            checked={addonCheck.second(type ?? 0)}
          />
        </S.CheckboxWrapper>
      )}

      {amount > 1 && <S.Count>{amount}</S.Count>}
    </S.Wrapper>
  )
}

export default SpriteBox
