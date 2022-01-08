import { vocation } from 'shared-utils/dist/vocations'
import { useForm } from '../../../contexts/Form'
import * as S from './styles'
import { AuctionItemProps } from './types'

const AuctionItem = ({
  nickname,
  level,
  vocationId,
  outfitId,
  ...props
}: AuctionItemProps): JSX.Element => {
  const { selectedCharacter } = useForm()

  return (
    <S.ButtonWrapper
      {...props}
      type="button"
      aria-selected={selectedCharacter?.nickname === nickname}
    >
      <S.SpritePortrait
        src={`https://static.tibia.com/images/charactertrade/outfits/${outfitId}.gif`}
        alt={nickname}
        title={nickname}
      />
      <div>
        <S.Nickname>{nickname}</S.Nickname>

        <S.Info>
          Level {level}
          {' - '}
          {vocation.getFullName(vocationId, level)}
        </S.Info>
      </div>
      <S.Arrow />
    </S.ButtonWrapper>
  )
}

export default AuctionItem
export { default as SkeletonItem } from './SkeletonItem'
