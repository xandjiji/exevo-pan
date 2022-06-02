import { useState } from 'react'
import { Switch, Input, Slider } from 'components/Atoms'
import { AutocompleteInput } from 'components/Organisms'

export const ExerciseWeapons = () => {
  const [value, setValue] = useState('')

  return (
    <div>
      <AutocompleteInput
        label="Server"
        placeholder="Choose a server"
        itemList={[
          { name: 'Pacera', value: 'Pacera' },
          { name: 'Julera', value: 'Julera' },
          { name: 'Antica', value: 'Antica' },
          { name: 'Venore', value: 'Venore' },
          { name: 'Fortera', value: 'Fortera' },
        ]}
        onItemSelect={({ name }) => console.log(name)}
        defaultValue="pace"
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
