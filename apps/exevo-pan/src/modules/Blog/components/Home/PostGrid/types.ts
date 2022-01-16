export interface PostGridViewProps {
  seed: number
  postList: BlogPost[]
  requestStatus: RequestStatus
  observerRef?: (node: any) => void
}
