import { LabeledTextBox } from '../styles'
import * as S from './styles'

const Pvp = ({
  serverData,
}: Pick<CharacterObject, 'serverData'>): JSX.Element => (
  <LabeledTextBox labelText="PvP">
    <S.BattleyeStatus data-battleye-protected={serverData.battleye} />
    {serverData.pvpType.string}
  </LabeledTextBox>
)

export default Pvp
