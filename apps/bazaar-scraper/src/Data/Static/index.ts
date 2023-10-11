import fs from 'fs/promises'
import { broadcast } from 'logging'
import * as DICTIONARIES from 'data-dictionary/dist/dictionaries'

const FILE_PATH = '../exevo-pan/public/sprites'

const ignoredFiles = new Set(['Rented Horse'])

export default class StaticData {
  private staticFileNames: Set<string> = new Set([])

  private dictionary: Set<string> = new Set([
    ...DICTIONARIES.store.scrapingTokens,
    ...DICTIONARIES.outfit.tokens,
    ...DICTIONARIES.storeOutfit.tokens,
    ...DICTIONARIES.mount.tokens,
    ...DICTIONARIES.storeMount.tokens,
  ])

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
      ...(await this.loadDirectory('store')),
      ...(await this.loadDirectory('mounts')),
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
    if (ignoredFiles.has(fileName)) return

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

    const checkDictionary = (fileName: string) => {
      if (!this.dictionary.has(fileName)) {
        this.missingFiles.add(fileName)
        this.addMissingFileAuction(id, fileName)
      }
    }

    const sexPrefix: 'male' | 'female' = sex ? 'female' : 'male'

    outfits.forEach(({ name, type }) => {
      checkFile(this.addPrefix(sexPrefix, `${name}_${type}.gif`))
      checkDictionary(name)
    })
    storeOutfits.forEach(({ name, type }) => {
      checkFile(this.addPrefix(sexPrefix, `${name}_${type}.gif`))
      checkDictionary(name)
    })

    mounts.forEach((name) => {
      checkFile(`${name}.gif`)
      checkDictionary(name)
    })
    storeMounts.forEach((name) => {
      checkFile(`${name}.gif`)
      checkDictionary(name)
    })

    storeItems.forEach(({ name }) => {
      checkFile(`${name}.gif`)
      checkDictionary(name)
    })
  }

  public getMissingFiles(): Set<string> {
    return this.missingFiles
  }

  public getMissingFileAuctions(): typeof this.missingFileAuctions {
    return this.missingFileAuctions
  }
}
