import { Dialog } from 'components/Atoms'
import { BossDialogProps } from './types'

const BossDialog = ({ bossInfo, onClose }: BossDialogProps) => (
  <Dialog isOpen={!!bossInfo} onClose={onClose}>
    ddsad
  </Dialog>
)

export default BossDialog
