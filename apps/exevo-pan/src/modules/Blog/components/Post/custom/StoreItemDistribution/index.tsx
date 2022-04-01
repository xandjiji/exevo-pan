import * as S from './styles'
import distributionData from './distribution.json'

const StoreItemDistribution = (): JSX.Element => (
  <S.Ul>
    <S.Li>
      <S.Percentage>{distributionData.dummy}</S.Percentage> Training Dummy
    </S.Li>
    <S.Li>
      <S.Percentage>{distributionData.goldPouch}</S.Percentage> Gold pouch
    </S.Li>
    <S.Li>
      <S.Percentage>{distributionData.hirelings}</S.Percentage> Hirelings
    </S.Li>
    <S.Li>
      <S.Percentage>{distributionData.charmExpansion}</S.Percentage> Charm
      expansion
    </S.Li>
    <S.Li>
      <S.Percentage>{distributionData.preySlot}</S.Percentage> Prey Slot
    </S.Li>
    <S.Li>
      <S.Percentage>{distributionData.huntingSlot}</S.Percentage> Hunting Task
      Slot
    </S.Li>
    <S.Li>
      <S.Percentage>{distributionData.imbuementShrine}</S.Percentage> Imbuement
      Shrine
    </S.Li>
    <S.Li>
      <S.Percentage>{distributionData.rewardShrine}</S.Percentage> Reward Shrine
    </S.Li>
    <S.Li>
      <S.Percentage>{distributionData.mailbox}</S.Percentage> Mailbox
    </S.Li>
  </S.Ul>
)

export default StoreItemDistribution
