import { useState } from 'react'
import { Switch, Input, SliderInput } from 'components/Atoms'
import { AutocompleteInput } from 'components/Organisms'

export const ExerciseWeapons = () => {
  const [value, setValue] = useState('')

  return (
    <div>
      <Input
        allowClear
        defaultValue="asdsa"
        label="Current skill"
        stateIcon="invalid"
      />

      <Input
        allowClear
        defaultValue="asdsa"
        label="Current skill"
        stateIcon="loading"
      />

      <Input
        allowClear
        defaultValue="asdsa"
        label="Current skill"
        stateIcon="neutral"
      />

      <Input
        allowClear
        defaultValue="asdsa"
        label="Current skill"
        stateIcon="valid"
      />

      <Input
        allowClear
        value={value}
        onChange={(event) => setValue(event.target.value)}
        label={<p>Desired skill</p>}
        aria-label="desired skill"
        stateIcon={value.includes('0') ? 'invalid' : 'neutral'}
        /* errorMessage={value.includes('0') ? 'invalid' : ''} */
      />

      {/* <p>% to next</p>
      <SliderInput max={100} min={0} />

      <AutocompleteInput
        itemList={[
          { name: 'Knight', value: 'knight' },
          { name: 'Druid', value: 'druid' },
        ]}
      />

      <Switch>Double event</Switch>
      <Switch>Private dummy</Switch> */}
    </div>
  )
}
