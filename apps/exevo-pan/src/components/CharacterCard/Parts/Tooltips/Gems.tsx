import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Tooltip } from 'components/Organisms'
import Lister from './Lister'
import * as S from './atoms'

type GemsProps = {
  gems: CharacterObject['gems']
} & React.ComponentPropsWithoutRef<'strong'>

const Gems = ({ gems, ...props }: GemsProps) => {
  const { common } = useTranslations()

  return (
    <Tooltip
      aria-label={common.CharacterCard.Tooltips.labels.supremeGems}
      content={<div>dasd</div>}
    >
      <S.TitleWrapper {...props}>
        <S.Icons.Imbuement />
        Gems: {Math.max(gems.lesser - 4, 0)}/{Math.max(gems.regular - 4, 0)}/
        {gems.greater}
      </S.TitleWrapper>
    </Tooltip>
  )
}

export default memo(Gems)
