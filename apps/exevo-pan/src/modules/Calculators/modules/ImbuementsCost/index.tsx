import { useState } from 'react'
import { Tabs } from 'components/Atoms'
import { Select } from 'components/Organisms'
import { numberWithCommaSeparator } from 'utils'
import { LabelWrapper, Panel, Input } from './atoms'
import * as Icons from './icons'
import { Main, LabeledCard } from '../../components'

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
      <LabeledCard labelText="Configurations">
        <div className="child:max-w-[50%] child:flex-grow flex items-end gap-4">
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
            noAlert
          />

          <Select
            label="Tier"
            options={[
              { name: 'Powerful', value: 'powerful' },
              { name: 'Intricate', value: 'intricate' },
              { name: 'Basic', value: 'basic' },
            ]}
            defaultValue="powerful"
            noAlert
          />
        </div>
      </LabeledCard>

      <LabeledCard
        labelText="Imbuements"
        className="mt-6"
        style={{ padding: '16px 12px 24px 12px' }}
      >
        <Tabs.Group>
          <Panel label="Vampirism (life leech)">
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

          <Panel label="Void (mana leech)">
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

          <Panel label="Strike (critical)">
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
      </LabeledCard>
    </Main>
  )
}

export default ImbuementsCost
