import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Tooltip } from 'components/Organisms'
import Lister from './Lister'
import * as S from './atoms'

type GemsProps = {
  gems: CharacterObject['gems']
  greaterGems: string[]
} & React.ComponentPropsWithoutRef<'strong'>

const Gems = ({ gems, greaterGems, ...props }: GemsProps) => {
  const { common } = useTranslations()

  const contentJSX = (
    <S.TitleWrapper {...props}>
      <S.Icons.Gem />
      Gems: {Math.max(gems.lesser - 4, 0)}-{Math.max(gems.regular - 4, 0)}-
      {gems.greater}
    </S.TitleWrapper>
  )

  if (greaterGems.length === 0) return contentJSX

  return (
    <Tooltip
      aria-label={common.CharacterCard.Tooltips.labels.supremeGems}
      content={<Lister fullList={greaterGems} partialList={greaterGems} />}
    >
      {contentJSX}
    </Tooltip>
  )
}

export default memo(Gems)
