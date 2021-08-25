import { useTranslation } from 'next-i18next'
import * as S from './styles'
import { KsuData } from '../../types'

const fallbackData = {
  name: 'Ksu',
  level: 425,
  vocation: 'Elite Knight',
  world: 'Belobra',
}

const KsuTooltip = ({
  characterData,
}: {
  characterData: KsuData
}): JSX.Element => {
  const { t } = useTranslation('about')

  const { error, data } = characterData.characters
  const { name, level, vocation, world } = error ? fallbackData : data
  return (
    <S.Wrapper>
      <S.SpritePortrait src="https://static.tibia.com/images/charactertrade/outfits/128_0.gif" />
      <div>
        <S.Nickname>
          {name}
          <S.Link
            href={`https://www.tibia.com/community/?name=${name}`}
            target="_blank"
            rel="noreferrer noopener external"
          >
            <S.ExternalIcon />
            {t('KsuTooltipLabel')}
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
