import { Alert, Button } from 'components/Atoms'
import { useGuildData } from './contexts/useGuildData'

/* @ ToDo:

- edit button
- add description button
- add/edit description dialog
- i18n

*/

const GuildDescription = () => {
  const { guild } = useGuildData()

  if (!guild.description) return null

  return (
    <Alert variant="primary" noIcon className="mx-auto max-w-full sm:w-96">
      {guild.description}
    </Alert>
  )
}

export default GuildDescription
