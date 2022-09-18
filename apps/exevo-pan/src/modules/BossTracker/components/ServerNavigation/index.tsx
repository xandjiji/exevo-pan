import { Select } from 'components/Organisms'
import styles from './styles.module.css'
import { ServerNavigationProps } from './types'

const ServerNavigation = ({
  currentServer,
  activeServers,
}: ServerNavigationProps) => (
  <section className="inner-container bg-darkerPrimary z-71 sticky top-[60px] py-3 shadow-md transition-colors">
    <Select
      label="Current server:"
      options={activeServers.map((server) => ({ name: server, value: server }))}
      defaultValue={currentServer}
      noAlert
      className={styles.select}
    />
  </section>
)

export default ServerNavigation
