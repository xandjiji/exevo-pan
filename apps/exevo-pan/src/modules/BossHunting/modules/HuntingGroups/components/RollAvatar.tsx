import { Avatar } from 'components/Organisms'
import { DiceIcon } from 'assets/svgs'
import { avatar } from 'utils'

type RollAvatarProps = {
  avatarId: number
  avatarDegree: number
  onChange: (args: { avatarId: number; avatarDegree: number }) => void
}

/* @ ToDo: i18n */

const RollAvatar = ({ avatarId, avatarDegree, onChange }: RollAvatarProps) => (
  <div className="relative">
    <Avatar
      alt="New guild avatar"
      avatarId={avatarId}
      avatarDegree={avatarDegree}
    />

    <button
      type="button"
      className="absolute top-[calc(100%+8px)] flex w-full cursor-pointer items-center justify-center gap-1 text-xs"
      onClick={() =>
        onChange({
          avatarId: avatar.getRandom.id(),
          avatarDegree: avatar.getRandom.degree(),
        })
      }
    >
      <DiceIcon className="fill-onSurface h-3 w-3" />{' '}
      <span className="text-onSurface underline underline-offset-2">Roll</span>
    </button>
  </div>
)

export default RollAvatar
