import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Tooltip } from 'components/Organisms'
import { tokens } from 'data-dictionary/dist/dictionaries/quest'
import { utilitary, access, bosses, others } from './lists'
import Lister from '../Lister'
import * as S from '../styles'
import { Grid, Group, Title } from './styles'
import { TooltipProps } from '../types'

const CharacterQuests = ({ items, ...props }: TooltipProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <Tooltip
      aria-label={common.CharacterCard.Tooltips.labels.quests}
      content={
        <Grid>
          <Group>
            <Title>{common.CharacterCard.Tooltips.quests.utilitary}</Title>
            <Lister partialList={items} fullList={utilitary} />
          </Group>

          <Group>
            <Title>{common.CharacterCard.Tooltips.quests.access}</Title>
            <Lister partialList={items} fullList={access} />
          </Group>

          <Group>
            <Title>{common.CharacterCard.Tooltips.quests.boss}</Title>
            <Lister partialList={items} fullList={bosses} />
          </Group>

          {!!others.length && (
            <Group>
              <Title>{common.CharacterCard.Tooltips.quests.other}</Title>
              <Lister partialList={items} fullList={others} />
            </Group>
          )}
        </Grid>
      }
    >
      <S.TitleWrapper {...props}>
        <S.Icons.Quest />
        {`Quests: ${items.length}/${tokens.length}`}
      </S.TitleWrapper>
    </Tooltip>
  )
}

export default memo(CharacterQuests)
