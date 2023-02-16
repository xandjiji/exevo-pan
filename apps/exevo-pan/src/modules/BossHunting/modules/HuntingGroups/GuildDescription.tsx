import { Alert } from 'components/Atoms'
import { useGuildData } from './contexts/useGuildData'

const GuildDescription = () => {
  const { guild } = useGuildData()

  if (guild.description) {
    return (
      <Alert variant="primary" noIcon className="mx-auto max-w-full sm:w-96">
        {guild.description}
      </Alert>
    )
  }

  return null
}

export default GuildDescription
