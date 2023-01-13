import { memo } from 'react'
import Image from 'next/image'
import yellowSrc from 'assets/yellowbattleye.png'
import greenSrc from 'assets/greenbattleye.png'
import { LabeledTextBox } from '../../atoms'

const Pvp = ({ serverData }: Pick<CharacterObject, 'serverData'>) => (
  <LabeledTextBox labelText="PvP">
    <Image
      role="none"
      alt={`${serverData.battleye ? 'Green' : 'Yellow'} BattlEye`}
      src={serverData.battleye ? greenSrc : yellowSrc}
    />
    {serverData.pvpType.string}
  </LabeledTextBox>
)

export default memo(Pvp)
