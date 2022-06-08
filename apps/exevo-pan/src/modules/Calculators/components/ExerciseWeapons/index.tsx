import { useState } from 'react'
import { Switch, Input, Slider } from 'components/Atoms'
import { Select } from 'components/Organisms'

const options = [
  { name: 'Pacera', value: 'pacera' },
  { name: 'Julera', value: 'julera' },
  { name: 'Antica', value: 'antica' },
  { name: 'Venore', value: 'venore' },
  { name: 'Fortera', value: 'fortera' },
]

export const ExerciseWeapons = () => {
  const [stateValue, setValue] = useState('venore')

  return (
    <div>
      <select
        name="cars"
        disabled
        onChange={(event) => console.log(event.target.value)}
      >
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>

      <div className="my-4" />

      <Input
        label="Select a player"
        errorMessage={stateValue === 'venore' ? 'Invalid server' : undefined}
        value={stateValue}
      />

      <div className="my-4" />

      <Select
        label="Server (controlled)"
        options={options}
        value={stateValue}
        error={stateValue === 'venore' ? 'Invalid server' : undefined}
        onChange={(e) => {
          console.log(e.target.value)
          setValue(e.target.value)
        }}
      />

      <div className="my-4" />

      <Select
        label="Server (controlled)"
        options={options}
        value={stateValue}
        onChange={(e) => {
          console.log(e.target.value)
          setValue(e.target.value)
        }}
      />

      <div className="my-4" />
      <Select
        label="Server (uncontrolled)"
        onChange={(e) => console.log(e.target.value)}
        options={options}
        disabled
        /* defaultValue="venore" */
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
