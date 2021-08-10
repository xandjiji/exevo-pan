import LightTheme from './LightTheme'
import DarkTheme from './DarkTheme'

export default {
  [LightTheme.title]: { ...LightTheme, next: DarkTheme.title },
  [DarkTheme.title]: { ...DarkTheme, next: LightTheme.title },
  default: { ...LightTheme, next: DarkTheme.title },
}
