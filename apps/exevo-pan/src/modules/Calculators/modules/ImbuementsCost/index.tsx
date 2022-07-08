import { useState } from 'react'
import { Input, Tabs } from 'components/Atoms'
import { Select } from 'components/Organisms'
import Image from 'next/image'
import goldTokenSrc from 'assets/goldToken.png'
import { numberWithCommaSeparator } from 'utils'
import { Main } from '../../components'

const ImbuementsCost = () => {
  const [value, setValue] = useState('')

  return (
    <Main>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label={
            <div className="flex items-center gap-1">
              <Image
                src={goldTokenSrc}
                width={12}
                height={12}
                alt="Gold Token"
              />
              Gold Token price
            </div>
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
        <Tabs.Panel label="Vampirism (Life leech)">dasdsa</Tabs.Panel>
        <Tabs.Panel label="Void (Mana leech)">dasdsa</Tabs.Panel>
        <Tabs.Panel label="Strike (Critical)">dasdsa</Tabs.Panel>
      </Tabs.Group>
    </Main>
  )
}

export default ImbuementsCost
