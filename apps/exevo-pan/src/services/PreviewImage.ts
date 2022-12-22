import { endpoints } from 'Constants'

type GetSrcProps = {
  title: string
  imgSrc: string
  fontSize?: number
}

export default class PreviewImageClient {
  static getSrc({ title, imgSrc, fontSize }: GetSrcProps): string {
    return `${endpoints.PREVIEW_IMAGES}?title=${title}&img=${imgSrc}${
      fontSize ? `&fontSize=${fontSize}` : ''
    }`
  }
}
