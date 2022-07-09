import { Tabs } from 'components/Atoms'
import { Select, ClientComponent } from 'components/Organisms'
import { LabelWrapper, Input } from './atoms'
import useStateRecord from './useStateRecord'
import * as Icons from './icons'
import { Main, LabeledCard } from '../../components'
import { RECIPES, RecordKeys } from './schema'

/* @ ToDo:
- results
    tooltip with 100% shrine chance
- calculator

- arrow up/down inc/dec
- validate number 0,123
*/

const ImbuementsCost = () => {
  const [stateRecord, updateRecord] = useStateRecord()

  return (
    <Main>
      <LabeledCard labelText="Configurations">
        <div className="child:max-w-[50%] child:flex-grow flex items-end gap-4">
          <ClientComponent>
            <Input
              label={
                <LabelWrapper>
                  <Icons.GoldToken />
                  Gold Token price
                </LabelWrapper>
              }
              placeholder="GP value"
              value={stateRecord[RecordKeys.goldToken] ?? ''}
              onChange={(e) =>
                updateRecord({ [RecordKeys.goldToken]: e.target.value })
              }
            />
          </ClientComponent>

          <Select
            label="Tier"
            options={[
              { name: 'Powerful', value: '2' },
              { name: 'Intricate', value: '1' },
              { name: 'Basic', value: '0' },
            ]}
            value={stateRecord[RecordKeys.tier] ?? ''}
            onChange={(e) =>
              updateRecord({ [RecordKeys.tier]: e.target.value })
            }
            noAlert
          />
        </div>
      </LabeledCard>

      <LabeledCard labelText="Imbuements" className="mt-6">
        <Tabs.Group>
          {RECIPES.map(({ name, materials }) => (
            <Tabs.Panel key={name} label={name}>
              <ClientComponent className="grid gap-4 py-2">
                {materials.map((material) => (
                  <Input
                    key={material.name}
                    label={
                      <LabelWrapper>
                        <material.icon />
                        {material.name} price
                      </LabelWrapper>
                    }
                    placeholder="GP value"
                    value={stateRecord[material.name] ?? ''}
                    onChange={(e) =>
                      updateRecord({ [material.name]: e.target.value })
                    }
                  />
                ))}
              </ClientComponent>
            </Tabs.Panel>
          ))}
        </Tabs.Group>
      </LabeledCard>
    </Main>
  )
}

export default ImbuementsCost
