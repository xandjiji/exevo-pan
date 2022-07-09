import { Tabs } from 'components/Atoms'
import { Select, ClientComponent } from 'components/Organisms'
import { LabelWrapper } from './atoms'
import useStateRecord from './useStateRecord'
import NumericInput from './NumericInput'
import * as Icons from './icons'
import { Main, LabeledCard } from '../../components'
import { RECIPES, RecordKeys } from './schema'

/* @ ToDo:
- calculator
- results
    tooltip with 100% shrine chance
    tooltip with yana dialog
*/

const ImbuementsCost = () => {
  const [stateRecord, updateRecord] = useStateRecord()

  return (
    <Main>
      <LabeledCard labelText="Configurations">
        <div className="child:max-w-[50%] child:flex-grow flex items-end gap-4">
          <ClientComponent>
            <NumericInput
              label={
                <LabelWrapper>
                  <Icons.GoldToken />
                  Gold Token price
                </LabelWrapper>
              }
              aria-label="Gold Token price"
              step={1000}
              value={stateRecord[RecordKeys.goldToken]}
              onChange={(value) =>
                updateRecord({ [RecordKeys.goldToken]: value })
              }
            />
          </ClientComponent>

          <Select
            label="Tier"
            options={[
              { name: 'Powerful (III)', value: '3' },
              { name: 'Intricate (II)', value: '2' },
              { name: 'Basic (I)', value: '1' },
            ]}
            value={stateRecord[RecordKeys.tier].toString()}
            onChange={(e) =>
              updateRecord({ [RecordKeys.tier]: +e.target.value })
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
                  <NumericInput
                    key={material.name}
                    label={
                      <LabelWrapper>
                        <material.icon />
                        {material.name} price
                      </LabelWrapper>
                    }
                    aria-label={material.name}
                    value={stateRecord[material.name]}
                    onChange={(value) =>
                      updateRecord({ [material.name]: value })
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
