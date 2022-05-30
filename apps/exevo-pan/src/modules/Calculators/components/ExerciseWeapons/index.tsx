import { useState } from 'react'
import { Switch, Input, Slider } from 'components/Atoms'
import { AutocompleteInput } from 'components/Organisms'

export const ExerciseWeapons = () => {
  const [value, setValue] = useState('')

  return (
    <div className="border-1 border-solid border-black">
      <Input label="Name" />

      <Slider
        label="Percentage to next"
        defaultValue={10}
        step={0.2}
        max={20}
        min={5}
        showInput
        displayValue
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
