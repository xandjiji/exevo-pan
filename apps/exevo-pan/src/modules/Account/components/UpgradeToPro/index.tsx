import clsx from 'clsx'
import { LabeledCard, Input, Button, Text } from 'components/Atoms'
import Pitch from './Pitch'

/* 
- abstract components
- <FROM> to Ksu
- confirm ACTION (loading state, api request, etc)
- payed state (delivery tooltip)
*/

const UpgradeToPro = () => {
  console.log(9)

  return (
    <div className="grid gap-8">
      <Pitch />

      <LabeledCard labelText="Buy now">
        <span className="text-tsm flex items-center gap-1">
          Transfer
          <Text.TibiaCoin value={250} /> Tibia Coins to{' '}
          <strong className="text-primaryHighlight">Ksu</strong>
        </span>

        <div className="flex items-end gap-4">
          <Input
            className="w-full"
            label="Sending coins character"
            placeholder="e.g, 'Bubble'"
            noAlert
          />
          <Button type="button" pill className="mb-[1px] py-3">
            Confirm
          </Button>
        </div>
      </LabeledCard>
    </div>
  )
}

export default UpgradeToPro
