export interface PostGridViewProps {
  postList: BlogPost[]
  requestStatus: RequestStatus
  observerRef?: (node: any) => void
}
