const CLEAR_REST_OF_LINE = '\x1b[K'
const NEWLINE = '\n'
const MOVE_CURSOR_TO_PREVIOUS_LINE = '\x1b[A'
const newline = () => `${CLEAR_REST_OF_LINE}${NEWLINE}`

export class TerminalStream {
  constructor() {
    process.stdout.write(`${this.footerText}${newline()}`)
  }

  private footerText = ''

  private print = (text: string) => {
    process.stdout.write(`${MOVE_CURSOR_TO_PREVIOUS_LINE}${text}`)
  }

  public log = (message: string): void => {
    this.print(`${message}${newline()}${this.footerText}${newline()}`)
  }

  public setFooterText = (value: string): void => {
    this.footerText = value
    this.print(`${value}${newline()}`)
  }
}
