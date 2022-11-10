import { exec } from 'child_process'
import { log } from 'logging'

export const executeShell = (cmd: string): Promise<string> =>
  new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) reject(error)

      const out = stdout ?? stderr
      log(out)
      resolve(out)
    })
  })
