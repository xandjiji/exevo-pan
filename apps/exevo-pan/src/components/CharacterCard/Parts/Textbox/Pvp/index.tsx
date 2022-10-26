import { memo } from 'react'
import clsx from 'clsx'
import { LabeledTextBox } from '../../atoms'

const Pvp = ({ server }: Pick<CharacterObject, 'server'>) => (
  <LabeledTextBox labelText="PvP">
    <div
      className={clsx(
        'border-1 h-2.5 w-2.5 rounded-full border-solid border-black/20 shadow-sm',
        server.battleye ? 'bg-battleGreen' : ' bg-battleYellow',
      )}
    />
    {server.pvpType}
  </LabeledTextBox>
)

export default memo(Pvp)
