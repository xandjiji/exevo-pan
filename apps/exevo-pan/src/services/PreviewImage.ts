import { endpoints } from 'Constants'

type GetSrcProps = {
  title: string
  imgSrc: string
}

export default class PreviewImageClient {
  static getSrc({ title, imgSrc }: GetSrcProps): string {
    return `${endpoints.PREVIEW_IMAGES}?title=${title}&img=${imgSrc}`
  }
}
