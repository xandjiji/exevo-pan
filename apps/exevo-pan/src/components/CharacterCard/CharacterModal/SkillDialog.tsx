import { Dialog } from 'components/Atoms'
import { ChipGroup } from 'components/Organisms'

type SkillDialogProps = {
  vocationId: number
  skills: CharacterSkillsObject
  isOpen: boolean
  onClose: () => void
}

const SkillDialog = ({
  vocationId,
  skills,
  ...dialogProps
}: SkillDialogProps) => {
  console.log(9)

  return <Dialog {...dialogProps}>dsaad</Dialog>
}

export default SkillDialog
