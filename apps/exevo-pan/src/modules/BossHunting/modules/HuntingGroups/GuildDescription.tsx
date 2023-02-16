import { Alert } from 'components/Atoms'
import type { Guild } from '@prisma/client'

const GuildDescription = ({
  id,
  description,
  isEditable,
}: Guild & { isEditable: boolean }) => {
  if (description) {
    return (
      <Alert variant="primary" noIcon className="mx-auto max-w-full sm:w-96">
        {description}
      </Alert>
    )
  }

  return null
}

export default GuildDescription
