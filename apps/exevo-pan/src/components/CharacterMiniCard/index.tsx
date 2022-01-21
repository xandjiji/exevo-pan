import { useTranslations } from 'contexts/useTranslation'
import * as S from './styles'
import { CharacterMiniCardProps } from './types'

const DEFAULT_OUTFIT_SRC =
  'https://static.tibia.com/images/charactertrade/outfits/128_0.gif'

const CharacterMiniCard = ({
  isCard = false,
  displayLink = false,
  displayServer = false,
  outfitSrc = DEFAULT_OUTFIT_SRC,
  characterData,
  forceSubtitle,
  ...props
}: CharacterMiniCardProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const { name, level, vocation, world } = characterData

  return (
    <S.Wrapper isCard={isCard} {...props}>
      <S.SpritePortrait src={outfitSrc} alt={name} title={name} />
      <div>
        <S.Nickname>
          {name}
          {displayLink && (
            <S.Link
              href={`https://www.tibia.com/community/?name=${name}`}
              target="_blank"
              rel="noreferrer noopener external"
            >
              <S.ExternalIcon />
              {common.CharacterTooltipLabel}
            </S.Link>
          )}
        </S.Nickname>
        <S.Description>
          {forceSubtitle ??
            `Level ${level} - ${vocation}${displayServer ? ` (${world})` : ''}`}
        </S.Description>
      </div>
    </S.Wrapper>
  )
}

export default CharacterMiniCard
