import { useState } from 'react'
import { Switch, Input, Slider } from 'components/Atoms'
import { AutocompleteInput } from 'components/Organisms'

export const ExerciseWeapons = () => {
  const [value, setValue] = useState('')

  return (
    <div>
      <Input label="Name" placeholder="Choose your fighter" stateIcon="valid" />
      <Input label="Name" defaultValue="Jackie Chan" />
      <Input label="Name" placeholder="Choose your fighter" disabled />
      <Input label="Name" defaultValue="Jackie Chan" disabled allowClear />
      <input disabled />
      <input placeholder="Choose your fighter" disabled />
      <input defaultValue="Jackie Chan" disabled />

      <Slider
        label="Percentage to next"
        defaultValue={10}
        max={20}
        min={5}
        showInput
        displayValue
        marks
      />
      <div className="my-4" />
      <Slider
        label="Percentage to next"
        defaultValue={10}
        step={0.2}
        max={20}
        min={5}
        showInput
      />
      <div className="my-4" />
      <Slider
        label="Percentage to next sem precisao"
        defaultValue={10}
        max={20}
        min={5}
        displayValue
        step={1}
        showInput
      />
      <div className="my-4" />
      <Slider
        label="Percentage to next"
        defaultValue={10}
        step={0.2}
        max={20}
        min={5}
        displayValue
      />

      <Slider
        label="Percentage to next"
        defaultValue={100}
        step={0.2}
        max={200}
        min={5}
        showInput
      />

      <Slider
        label="% to next"
        defaultValue={10}
        step={0.2}
        max={20}
        min={5}
        showInput
        displayValue
        disabled
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
