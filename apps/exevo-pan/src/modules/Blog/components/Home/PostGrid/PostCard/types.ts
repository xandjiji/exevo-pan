export interface PostCardProps extends React.HTMLAttributes<HTMLDivElement> {
  postData: BlogPost
  as?: React.ElementType
}

export type DateObject = {
  month: number
  day: number
  year: number
}
