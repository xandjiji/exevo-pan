import { memo } from 'react'
import { loadRawSrc } from 'utils'
import { LabeledTextBox } from '../../atoms'

const greenSrc = loadRawSrc('/assets/greenbattleye.png')
const yellowSrc = loadRawSrc('/assets/yellowbattleye.png')

const Pvp = ({ serverData }: Pick<CharacterObject, 'serverData'>) => (
  <LabeledTextBox labelText="PvP">
    <img
      role="none"
      alt={`${serverData.battleye ? 'Green' : 'Yellow'} BattlEye`}
      src={serverData.battleye ? greenSrc : yellowSrc}
      className="pixelated"
    />
    {serverData.pvpType.string}
  </LabeledTextBox>
)

export default memo(Pvp)
