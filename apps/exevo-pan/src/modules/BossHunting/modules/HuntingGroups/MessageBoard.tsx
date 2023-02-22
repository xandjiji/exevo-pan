import { Alert, Button } from 'components/Atoms'
import { EditIcon } from 'assets/svgs'
import { useGuildData } from './contexts/useGuildData'

/* @ ToDo:

- i18n

*/

type MessageBoardProps = {
  title?: React.ReactNode
  editText: string
  addText: string
  onEdit: () => void
}

const MessageBoard = ({
  title,
  editText,
  addText,
  onEdit,
}: MessageBoardProps) => {
  const { guild, isEditor } = useGuildData()

  if (!guild.description && !isEditor) return null

  return (
    <div className="mx-auto grid max-w-full gap-2 sm:w-96">
      <h4 className="text-tsm text-onSurface font-normal">{title}</h4>
      {guild.description ? (
        <Alert variant="primary" noIcon className="whitespace-pre-wrap">
          {guild.description}

          {isEditor && (
            <Button
              hollow
              pill
              className="mx-auto mt-3 text-base"
              onClick={onEdit}
            >
              <EditIcon className="h-4 w-4" />
              {editText}
            </Button>
          )}
        </Alert>
      ) : (
        <div className="border-1 border-separator mx-auto grid max-w-full place-items-center rounded-md border-dashed py-2 px-4 sm:w-96">
          <Button hollow pill className="mx-auto text-base" onClick={onEdit}>
            <EditIcon className="h-4 w-4" />
            {addText}
          </Button>
        </div>
      )}
    </div>
  )
}

export default MessageBoard
