import clsx from 'clsx'
import { useState, useCallback } from 'react'
import { LabeledCard, Input, Button, Text } from 'components/Atoms'
import type { PaymentData } from '@prisma/client'
import Pitch from './Pitch'

/* 
- confirm ACTION (loading state, api request, etc)
- <FROM> to Ksu
- payed state (delivery tooltip)
*/

const UpgradeToPro = ({ character }: Partial<PaymentData>) => {
  const [inputValue, setInputValue] = useState(character)

  const onSubmit = useCallback(
    (
      e: React.FormEvent<
        ExtendedHTMLFormElement<{ character: HTMLInputElement }>
      >,
    ) => {
      e.preventDefault()
      const { value } = e.currentTarget.elements.character

      console.log(value)
    },
    [],
  )

  return (
    <div className="grid gap-8">
      <Pitch />

      <LabeledCard labelText="Buy now">
        <span className="text-tsm flex items-center gap-1">
          Transfer
          <Text.TibiaCoin value={250} /> Tibia Coins{' '}
          {inputValue ? (
            <>
              from <strong>{inputValue}</strong>
            </>
          ) : null}{' '}
          to <strong className="text-primaryHighlight">Ksu</strong>
        </span>

        <form name="test" onSubmit={onSubmit} className="flex items-end gap-4">
          <Input
            className="w-full"
            name="character"
            label="Sending coins character"
            placeholder="e.g, 'Bubble'"
            noAlert
            defaultValue={character}
            onChange={(e) => setInputValue(e.target.value.trim())}
            enterKeyHint="send"
          />
          <Button type="submit" pill className="mb-[1px] py-3">
            Confirm
          </Button>
        </form>
      </LabeledCard>
    </div>
  )
}

export default UpgradeToPro
