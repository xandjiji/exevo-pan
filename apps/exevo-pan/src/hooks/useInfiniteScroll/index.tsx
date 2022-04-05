import { useCallback, useRef } from 'react'

const useInfiniteScroll = (fetchNextPage: () => any): ((node: any) => void) => {
  const observer = useRef<IntersectionObserver | null>(null)

  const lastFactRef = useCallback(
    (node) => {
      observer.current?.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        const [firstEntry] = entries
        if (firstEntry.isIntersecting) {
          fetchNextPage()
        }
      })
      if (node) observer.current?.observe(node)
    },
    [fetchNextPage],
  )

  return lastFactRef
}

export default useInfiniteScroll
