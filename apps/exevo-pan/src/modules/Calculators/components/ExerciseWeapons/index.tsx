import { useState } from 'react'
import { Switch, Input, Slider, Option } from 'components/Atoms'
import { Select } from 'components/Organisms'

const options = [
  { name: 'Pacera', value: 'Pacera' },
  { name: 'Julera', value: 'Julera' },
  { name: 'Antica', value: 'Antica' },
  { name: 'Venore', value: 'Venore' },
  { name: 'Fortera', value: 'Fortera' },
]

export const ExerciseWeapons = () => {
  const [_, setValue] = useState('')

  return (
    <div>
      <select name="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>

      <div className="my-4" />

      <Input label="Select a player" />

      <div className="my-4" />

      <Select
      /* label="Server" */
      >
        {options.map(({ name, value }) => (
          <Option key={value} value={value}>
            {name}
          </Option>
        ))}
      </Select>

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
