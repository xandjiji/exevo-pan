declare type WindowObject = Window &
  typeof globalThis & {
    gtag: any
  }
