import localtunnel from 'localtunnel'
import { broadcast, coloredText } from 'logging'

const { PORT } = process.env

export const exposeLocalhost = async (): Promise<void> => {
  const tunnel = await localtunnel({
    port: +PORT!,
    subdomain: 'staging-history-exevopan',
  })

  broadcast(
    `${coloredText(
      `http://localhost:${PORT}`,
      'highlight',
    )} is being tunneled to ${tunnel.url}`,
    'success',
  )
}
