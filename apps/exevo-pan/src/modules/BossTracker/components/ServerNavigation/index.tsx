import { memo } from 'react'
import { useRouter } from 'next/router'
import { Select } from 'components/Organisms'
import { routes } from 'Constants'
import styles from './styles.module.css'
import { ServerNavigationProps } from './types'

const ServerNavigation = ({
  currentServer,
  activeServers,
}: ServerNavigationProps) => {
  const { push } = useRouter()

  return (
    <section className="inner-container bg-darkerPrimary z-71 sticky top-[60px] py-3 shadow-md transition-colors">
      <Select
        label="Current server:"
        options={activeServers.map((server) => ({
          name: server,
          value: server,
        }))}
        defaultValue={currentServer}
        onChange={(e) => push(`/${routes.BOSS_TRACKER}/${e.target.value}`)}
        noAlert
        className={styles.select}
      />
    </section>
  )
}

export default memo(ServerNavigation)
