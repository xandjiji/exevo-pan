import { useState } from 'react'
import { Input, Tabs } from 'components/Atoms'
import { Select } from 'components/Organisms'
import { numberWithCommaSeparator } from 'utils'
import { LabelWrapper, Panel } from './atoms'
import * as Icons from './icons'
import { Main } from '../../components'

/* @ ToDo:
- materials fields (com icons)
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
                <Icons.RopeBelt />
                Rope Belts price
              </LabelWrapper>
            }
            inputMode="numeric"
            placeholder="GP value"
            noAlert
          />
          <Input
            label={
              <LabelWrapper>
                <Icons.SilencerClaws />
                Silencer Claws price
              </LabelWrapper>
            }
            inputMode="numeric"
            placeholder="GP value"
            noAlert
          />
          <Input
            label={
              <LabelWrapper>
                <Icons.GrimeleechWings />
                Some Grimeleech Wings price
              </LabelWrapper>
            }
            inputMode="numeric"
            placeholder="GP value"
            noAlert
          />
        </Panel>
        <Panel label="Void (Mana leech)">dasdsa</Panel>
        <Panel label="Strike (Critical)">dasdsa</Panel>
      </Tabs.Group>
    </Main>
  )
}

export default ImbuementsCost
