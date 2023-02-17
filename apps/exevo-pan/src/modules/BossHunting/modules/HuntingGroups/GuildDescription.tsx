import { useState, useCallback } from 'react'
import { Alert, Button, Dialog, TextArea } from 'components/Atoms'
import { EditIcon } from 'assets/svgs'
import { useGuildData } from './contexts/useGuildData'

/* @ ToDo:

- add/edit description dialog
    - length counter
    - max length (using pie)
    - submit action
    - after submit
    - caracteres especiais, etc?

- i18n

*/

const GuildDescription = () => {
  const { guild, isEditor } = useGuildData()
  const [formState, setFormState] = useState({
    isOpen: false,
    description: guild.description ?? '',
  })

  const closeForm = useCallback(
    () =>
      setFormState({
        isOpen: false,
        description: guild.description ?? '',
      }),
    [],
  )

  if (!guild.description && !isEditor) return null

  return (
    <>
      {guild.description ? (
        <Alert variant="primary" noIcon className="mx-auto max-w-full sm:w-96">
          {guild.description}

          {isEditor && (
            <Button
              hollow
              pill
              className="mx-auto mt-3 text-base"
              onClick={() =>
                setFormState((prev) => ({ ...prev, isOpen: true }))
              }
            >
              <EditIcon className="h-4 w-4" />
              Edit description
            </Button>
          )}
        </Alert>
      ) : (
        <div className="border-1 border-separator mx-auto grid max-w-full place-items-center rounded-md border-dashed py-2 px-4 sm:w-96">
          <Button
            hollow
            pill
            className="mx-auto text-base"
            onClick={() => setFormState((prev) => ({ ...prev, isOpen: true }))}
          >
            <EditIcon className="h-4 w-4" />
            Add description
          </Button>
        </div>
      )}

      <Dialog
        heading="Edit group description"
        isOpen={formState.isOpen}
        onClose={closeForm}
      >
        <TextArea
          label="New description"
          value={formState.description}
          className="min-h-[120px]"
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, description: e.target.value }))
          }
          maxLength={100}
        />

        <div className="mt-4 flex items-center justify-end gap-4">
          <Button pill hollow onClick={closeForm}>
            Cancel
          </Button>
          <Button pill>Save</Button>
        </div>
      </Dialog>
    </>
  )
}

export default GuildDescription
