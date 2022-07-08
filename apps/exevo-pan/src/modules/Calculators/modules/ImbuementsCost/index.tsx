import { useState } from 'react'
import { Tabs } from 'components/Atoms'
import { Select } from 'components/Organisms'
import { numberWithCommaSeparator } from 'utils'
import { LabelWrapper, Panel, Input } from './atoms'
import * as Icons from './icons'
import { Main, LabeledCard } from '../../components'
import { RECIPES } from './schema'

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

      <LabeledCard labelText="Imbuements" className="mt-6">
        <Tabs.Group>
          {RECIPES.map((recipe) => (
            <Panel label={recipe.name}>
              {recipe.materials.map((material) => (
                <Input
                  label={
                    <LabelWrapper>
                      <material.icon />
                      {material.name} price
                    </LabelWrapper>
                  }
                  placeholder="GP value"
                />
              ))}
            </Panel>
          ))}
        </Tabs.Group>
      </LabeledCard>
    </Main>
  )
}

export default ImbuementsCost
