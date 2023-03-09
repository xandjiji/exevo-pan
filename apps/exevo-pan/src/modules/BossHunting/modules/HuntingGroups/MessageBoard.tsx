import { memo } from 'react'
import { Alert, Button } from 'components/Atoms'
import { EditIcon } from 'assets/svgs'

type MessageBoardProps = {
  title?: React.ReactNode
  description?: string | null
  isEditor: boolean
  editText: string
  addText: string
  onEdit: () => void
}

const MessageBoard = ({
  title,
  description,
  isEditor,
  editText,
  addText,
  onEdit,
}: MessageBoardProps) => {
  if (!description && !isEditor) return null

  return (
    <div className="grid gap-2">
      <h4 className="text-tsm text-onSurface font-normal">{title}</h4>
      {description ? (
        <Alert variant="primary" noIcon className="whitespace-pre-line">
          <div style={{ wordBreak: 'break-word' }}>{description}</div>

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
        <div className="border-1 border-separator mx-auto grid w-full place-items-center rounded-md border-dashed py-2 px-4">
          <Button hollow pill className="mx-auto text-base" onClick={onEdit}>
            <EditIcon className="h-4 w-4" />
            {addText}
          </Button>
        </div>
      )}
    </div>
  )
}

export default memo(MessageBoard)
