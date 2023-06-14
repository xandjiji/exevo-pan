/* eslint-disable jsx-a11y/heading-has-content */
import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Tooltip } from 'components/Organisms'
import { tokens } from 'data-dictionary/dist/dictionaries/quest'
import { utilitary, access, bosses, others } from './lists'
import Lister from '../Lister'
import * as S from '../atoms'
import { TooltipProps } from '../types'

const Group = (args: JSX.IntrinsicElements['div']) => (
  <div className="text-tsm shrink-0" {...args} />
)

const Title = (args: JSX.IntrinsicElements['h5']) => (
  <h5 className="text-s text-primaryHighlight mb-2 text-center" {...args} />
)

const CharacterQuests = ({ items, placement, ...props }: TooltipProps) => {
  const { common } = useTranslations()

  return (
    <Tooltip
      aria-label={common.CharacterCard.Tooltips.labels.quests}
      placement={placement}
      content={
        <div className="w-[calc(100vw - 36px)] custom-scrollbar flex max-w-max justify-between gap-4 overflow-x-auto md:w-max">
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
        </div>
      }
    >
      <S.TitleWrapper {...props}>
        <S.Icons.Quest />
        Quests: {items.length}/{tokens.length}
      </S.TitleWrapper>
    </Tooltip>
  )
}

export default memo(CharacterQuests)
