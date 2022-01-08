import fs from 'fs/promises'
import { broadcast, coloredText } from 'logging'
import { file } from 'Constants'

const FILE_PATH = file.HIGHLIGHTED_AUCTIONS.path
const FILE_NAME = coloredText(file.HIGHLIGHTED_AUCTIONS.name, 'highlight')

export default class HighlightedAuctionsData {
  private highlightedAuctions: CharacterObject[] = []

  public async save(): Promise<void> {
    await fs.writeFile(FILE_PATH, JSON.stringify(this.highlightedAuctions))
    broadcast(`Highlighted auctions were saved to ${FILE_NAME}`, 'success')
  }

  public setHighlightedAuctions(
    newHighlightedAuctions: CharacterObject[],
  ): void {
    this.highlightedAuctions = newHighlightedAuctions
  }
}
