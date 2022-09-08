import fs from 'fs/promises'
import { broadcast, coloredText, coloredDiff } from 'logging'

const FILE_PATH = '../exevo-pan/public/sprites'

export default class StaticData {
  private staticFileNames: Set<string> = new Set([])

  private missingFiles: Set<string> = new Set([])

  private async loadDirectory(directory: string): Promise<string[]> {
    return fs.readdir(`${FILE_PATH}/${directory}`, 'utf-8')
  }

  public addPrefix(prefix: 'male' | 'female', file: string): string {
    return `${prefix}-${file}`
  }

  async load(): Promise<void> {
    broadcast(`Loading static files from Exevo Pan...`, 'system')

    this.staticFileNames = new Set([
      ...(await this.loadDirectory('mounts')),
      ...(await this.loadDirectory('store')),
      ...(await this.loadDirectory('storemounts')),
      ...(await this.loadDirectory('outfits/female')).map((file) =>
        this.addPrefix('female', file),
      ),
      ...(await this.loadDirectory('outfits/male')).map((file) =>
        this.addPrefix('male', file),
      ),
      ...(await this.loadDirectory('storeoutfits/female')).map((file) =>
        this.addPrefix('female', file),
      ),
      ...(await this.loadDirectory('storeoutfits/male')).map((file) =>
        this.addPrefix('male', file),
      ),
    ])
  }

  public checkFile(fileName: string): void {
    if (!this.staticFileNames.has(fileName)) {
      this.missingFiles.add(fileName)
    }
  }

  public getMissingFiles(): Set<string> {
    return this.missingFiles
  }
}
