import { useTranslations } from 'contexts/useTranslation'
import { SpritePortrait } from 'components/Atoms'
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
  characterName,
  forceSubtitle,
  ...props
}: CharacterMiniCardProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const name = characterName ?? (characterData as SingleCharacterData).name

  return (
    <S.Wrapper isCard={isCard} {...props}>
      <SpritePortrait
        offset
        width={64}
        height={64}
        src={outfitSrc}
        alt={name}
        title={name}
      />
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
            (characterData &&
              `Level ${characterData.level} - ${characterData.vocation}${
                displayServer ? ` (${characterData.world})` : ''
              }`)}
        </S.Description>
      </div>
    </S.Wrapper>
  )
}

export default CharacterMiniCard
