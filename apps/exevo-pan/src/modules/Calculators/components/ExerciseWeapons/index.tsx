import { useState } from 'react'
import { Switch, Input, SliderInput } from 'components/Atoms'
import { AutocompleteInput } from 'components/Organisms'

export const ExerciseWeapons = () => {
  const [value, setValue] = useState('')

  return (
    <div>
      <p>Current skill</p>
      <Input allowClear defaultValue="asdsa" />

      <p>Desired skill</p>
      <Input
        allowClear
        value={value}
        onChange={(event) => setValue(event.target.value)}
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
