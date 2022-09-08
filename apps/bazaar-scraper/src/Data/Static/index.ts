import fs from 'fs/promises'
import { broadcast, coloredText, coloredDiff } from 'logging'

const FILE_PATH = '../exevo-pan/public/sprites'

export default class StaticData {
  private staticFileNames: Set<string> = new Set([])

  private missingFiles: Set<string> = new Set([])

  private missingFileAuctions: Record<number, string[]> = {}

  private async loadDirectory(directory: string): Promise<string[]> {
    return fs.readdir(`${FILE_PATH}/${directory}`, 'utf-8')
  }

  private addPrefix(prefix: 'male' | 'female', file: string): string {
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

  private addMissingFileAuction(id: number, fileName: string) {
    if (this.missingFileAuctions[id]) {
      this.missingFileAuctions[id].push(fileName)
    } else {
      this.missingFileAuctions[id] = [fileName]
    }
  }

  public checkAuction({
    id,
    sex,
    outfits,
    storeOutfits,
    mounts,
    storeMounts,
    storeItems,
  }: PartialCharacterObject): void {
    const checkFile = (fileName: string) => {
      if (!this.staticFileNames.has(fileName)) {
        this.missingFiles.add(fileName)
        this.addMissingFileAuction(id, fileName)
      }
    }

    const sexPrefix: 'male' | 'female' = sex ? 'female' : 'male'

    outfits.forEach(({ name, type }) =>
      checkFile(this.addPrefix(sexPrefix, `${name}_${type}.gif`)),
    )
    storeOutfits.forEach(({ name, type }) =>
      this.addPrefix(sexPrefix, `${name}_${type}.gif`),
    )

    mounts.forEach((name) => checkFile(`${name}.gif`))
    storeMounts.forEach((name) => checkFile(`${name}.gif`))

    storeItems.forEach(({ name }) => checkFile(`${name}.gif`))
  }

  public getMissingFiles(): Set<string> {
    return this.missingFiles
  }

  public getMissingFileAuctions(): typeof this.missingFileAuctions {
    return this.missingFileAuctions
  }
}
