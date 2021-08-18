import LightTheme from './LightTheme'
import DarkTheme from './DarkTheme'

const Themes = {
  [LightTheme.title]: { ...LightTheme, next: DarkTheme.title },
  [DarkTheme.title]: { ...DarkTheme, next: LightTheme.title },
  default: { ...LightTheme, next: DarkTheme.title },
}

export default Themes
