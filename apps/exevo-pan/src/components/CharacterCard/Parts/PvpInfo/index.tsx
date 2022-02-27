import { LabeledTextBox } from 'components/CharacterCard/styles'
import * as S from './styles'

const PvpInfo = ({
  serverData,
}: Pick<CharacterObject, 'serverData'>): JSX.Element => (
  <LabeledTextBox labelText="PvP">
    <S.BattleyeStatus data-battleye-protected={serverData.battleye} />
    {serverData.pvpType.string}
  </LabeledTextBox>
)

export default PvpInfo
