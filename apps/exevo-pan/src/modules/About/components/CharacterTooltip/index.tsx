import { useTranslations } from 'contexts/useTranslation'
import * as S from './styles'

const outfits = {
  Ksu: 'https://i.imgur.com/O38datw.png',
  Algoolek: 'https://i.imgur.com/dPnnICm.png',
}

const CharacterTooltip = ({
  characterData,
}: {
  characterData: SingleCharacterData
}): JSX.Element => {
  const {
    translations: { about },
  } = useTranslations()

  const { name, level, vocation, world } = characterData

  return (
    <S.Wrapper>
      <S.SpritePortrait src={outfits[name as keyof typeof outfits]} />
      <div>
        <S.Nickname>
          {name}
          <S.Link
            href={`https://www.tibia.com/community/?name=${name}`}
            target="_blank"
            rel="noreferrer noopener external"
          >
            <S.ExternalIcon />
            {about.CharacterTooltipLabel}
          </S.Link>
        </S.Nickname>
        <S.Description>
          Level {level} - {vocation} ({world})
        </S.Description>
      </div>{' '}
    </S.Wrapper>
  )
}

export default CharacterTooltip
