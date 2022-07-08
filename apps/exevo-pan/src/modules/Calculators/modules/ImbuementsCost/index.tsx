import { useState } from 'react'
import { Tabs } from 'components/Atoms'
import { Select } from 'components/Organisms'
import { numberWithCommaSeparator } from 'utils'
import { LabelWrapper, Panel, Input } from './atoms'
import * as Icons from './icons'
import { Main } from '../../components'

/* @ ToDo:
- results
    tooltip with 100% shrine chance
- calculator

- arrow up/down inc/dec
- useStorageState
*/

const ImbuementsCost = () => {
  const [value, setValue] = useState('')

  return (
    <Main>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label={
            <LabelWrapper>
              <Icons.GoldToken />
              Gold Token price
            </LabelWrapper>
          }
          inputMode="numeric"
          placeholder="GP value"
          defaultValue={20000}
          mask={numberWithCommaSeparator}
        />

        <Select
          label="Tier"
          options={[
            { name: 'Powerful', value: 'powerful' },
            { name: 'Intricate', value: 'intricate' },
            { name: 'Basic', value: 'basic' },
          ]}
          defaultValue="powerful"
        />
      </div>

      <Tabs.Group>
        <Panel label="Vampirism (Life leech)">
          <Input
            label={
              <LabelWrapper>
                <Icons.VampireTeeth />
                Vampire Teeth price
              </LabelWrapper>
            }
          />
          <Input
            label={
              <LabelWrapper>
                <Icons.BloodyPincers />
                Bloody Pincers price
              </LabelWrapper>
            }
          />
          <Input
            label={
              <LabelWrapper>
                <Icons.PieceOfDeadBrain />
                Piece of Dead Brain price
              </LabelWrapper>
            }
          />
        </Panel>

        <Panel label="Void (Mana leech)">
          <Input
            label={
              <LabelWrapper>
                <Icons.RopeBelt />
                Rope Belts price
              </LabelWrapper>
            }
          />
          <Input
            label={
              <LabelWrapper>
                <Icons.SilencerClaws />
                Silencer Claws price
              </LabelWrapper>
            }
          />
          <Input
            label={
              <LabelWrapper>
                <Icons.GrimeleechWings />
                Some Grimeleech Wings price
              </LabelWrapper>
            }
          />
        </Panel>

        <Panel label="Strike (Critical)">
          <Input
            label={
              <LabelWrapper>
                <Icons.ProtectiveCharm />
                Protective Charm price
              </LabelWrapper>
            }
          />
          <Input
            label={
              <LabelWrapper>
                <Icons.Sabretooth />
                Sabretooth price
              </LabelWrapper>
            }
          />
          <Input
            label={
              <LabelWrapper>
                <Icons.VexclawTalon />
                Vexclaw Talon price
              </LabelWrapper>
            }
          />
        </Panel>
      </Tabs.Group>
    </Main>
  )
}

export default ImbuementsCost
