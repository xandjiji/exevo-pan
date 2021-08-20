import * as S from './styles'
import { KsuData } from '../../types'

const KsuTooltip = ({
  characterData,
}: {
  characterData: KsuData
}): JSX.Element => {
  const { name, level, vocation, world } = characterData.characters.data
  return (
    <S.Wrapper>
      <S.SpritePortrait src="https://static.tibia.com/images/charactertrade/outfits/128_0.gif" />
      <div>
        <S.Nickname>
          {name}
          <S.Link
            href={`https://www.tibia.com/community/?name=${name}`}
            target="_blank"
            rel="noreferrer"
          >
            <S.ExternalIcon />
            Go to character page
          </S.Link>
        </S.Nickname>
        <S.Description>
          Level {level} - {vocation} ({world})
        </S.Description>
      </div>{' '}
    </S.Wrapper>
  )
}

export default KsuTooltip
