import { Switch, Input, SliderInput } from 'components/Atoms'
import { AutocompleteInput } from 'components/Organisms'

export const ExerciseWeapons = () => {
  console.log(1)

  return (
    <div>
      <p>Current skill</p>
      <Input type="number" min={10} defaultValue={100} />

      <p>Desired skill</p>
      <Input type="number" />

      <p>% to next</p>
      <SliderInput max={100} min={0} />

      <AutocompleteInput
        itemList={[
          { name: 'Knight', value: 'knight' },
          { name: 'Druid', value: 'druid' },
        ]}
      />

      <Switch>Double event</Switch>
      <Switch>Private dummy</Switch>
    </div>
  )
}
