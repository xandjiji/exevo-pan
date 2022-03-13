import { randomDataset } from 'utils/test'
import { PAGE_SIZE } from '..'

const { characterData } = randomDataset()

export const mockedPage = characterData.slice(0, PAGE_SIZE)

export const mockedPageData = {
  pageIndex: 0,
  totalItems: characterData.length * PAGE_SIZE,
  startOffset: 0,
  endOffset: PAGE_SIZE,
  hasNext: true,
  hasPrev: false,
}
