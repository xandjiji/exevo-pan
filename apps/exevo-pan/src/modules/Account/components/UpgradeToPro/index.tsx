import { LabeledCard, Input, Button, Text } from 'components/Atoms'

/* 
explicar o que é exevo pro
    acesso ilimitado a features exlcusivas
    preço
    forever
read more (link pra landing page)

send 250 TC to Ksu
From
Delivery time tooltip

*/

const UpgradeToPro = () => {
  console.log(9)

  return (
    <>
      <div className="grid gap-2">
        <span className="flex items-center gap-2">
          Upgrade now to{' '}
          <strong className="text-primaryHighlight text-2xl tracking-wider">
            Exevo Pro 🧙
          </strong>
        </span>
        And have access to exclusive features!
      </div>
      <LabeledCard labelText="Buy now">
        <span className="text-tsm mb-1 flex items-center gap-1">
          Transfer
          <Text.TibiaCoin value={250} /> Tibia Coins to{' '}
          <strong className="text-primaryHighlight">Ksu</strong>
        </span>

        <div className="flex items-end gap-4">
          <Input
            label="Sending coins character"
            placeholder="e.g, 'Bubble'"
            noAlert
          />
          <Button type="button" pill className="mb-[1px] py-3">
            Confirm
          </Button>
        </div>
      </LabeledCard>
    </>
  )
}

export default UpgradeToPro
