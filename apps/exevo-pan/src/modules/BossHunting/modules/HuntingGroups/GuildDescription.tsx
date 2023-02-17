import { Alert, Button } from 'components/Atoms'
import { EditIcon } from 'assets/svgs'
import { useGuildData } from './contexts/useGuildData'

/* @ ToDo:

- add/edit description dialog
- i18n

*/

const GuildDescription = () => {
  const { guild, isEditor } = useGuildData()

  if (guild.description) {
    return (
      <Alert variant="primary" noIcon className="mx-auto max-w-full sm:w-96">
        {guild.description}

        {isEditor && (
          <Button hollow pill className="mx-auto mt-3 text-base">
            <EditIcon className="h-4 w-4" />
            Edit description
          </Button>
        )}
      </Alert>
    )
  }

  if (isEditor) {
    return (
      <div className="border-1 border-separator mx-auto grid max-w-full place-items-center rounded-md border-dashed py-2 px-4 sm:w-96">
        <Button hollow pill className="mx-auto text-base">
          <EditIcon className="h-4 w-4" />
          Add description
        </Button>
      </div>
    )
  }

  return null
}

export default GuildDescription
