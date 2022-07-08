import { useState } from 'react'
import { Input, Tabs } from 'components/Atoms'
import { Select } from 'components/Organisms'
import Image from 'next/image'
import goldTokenSrc from 'assets/goldToken.png'
import ropebeltSrc from 'assets/ropeBelt.png'
import silencerclawsSrc from 'assets/silencerClaws.png'
import grimeleechSrc from 'assets/grimeleech.png'
import { numberWithCommaSeparator } from 'utils'
import { LabelWrapper, Panel } from './atoms'
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
              <Image
                src={goldTokenSrc}
                width={12}
                height={12}
                alt="Gold Token"
              />
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
                <Image
                  src={ropebeltSrc}
                  width={11}
                  height={12}
                  alt="Rope Belt"
                />
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
                <Image
                  src={silencerclawsSrc}
                  width={11}
                  height={12}
                  alt="Silencer Claws"
                />
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
                <Image
                  src={grimeleechSrc}
                  width={12}
                  height={12}
                  alt="Some Grimeleech Wings"
                />
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
