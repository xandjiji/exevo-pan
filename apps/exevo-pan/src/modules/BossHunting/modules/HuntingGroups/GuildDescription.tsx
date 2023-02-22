import { Alert, Button } from 'components/Atoms'
import { EditIcon } from 'assets/svgs'
import { useGuildData } from './contexts/useGuildData'

/* @ ToDo:

- i18n

*/

type GuildDescriptionProps = {
  onEdit: () => void
}

const GuildDescription = ({ onEdit }: GuildDescriptionProps) => {
  const { guild, isEditor } = useGuildData()

  if (!guild.description && !isEditor) return null

  return guild.description ? (
    <Alert
      variant="primary"
      noIcon
      className="mx-auto max-w-full whitespace-pre-wrap sm:w-96"
    >
      {guild.description}

      {isEditor && (
        <Button hollow pill className="mx-auto mt-3 text-base" onClick={onEdit}>
          <EditIcon className="h-4 w-4" />
          Edit description
        </Button>
      )}
    </Alert>
  ) : (
    <div className="border-1 border-separator mx-auto grid max-w-full place-items-center rounded-md border-dashed py-2 px-4 sm:w-96">
      <Button hollow pill className="mx-auto text-base" onClick={onEdit}>
        <EditIcon className="h-4 w-4" />
        Add description
      </Button>
    </div>
  )
}

export default GuildDescription
