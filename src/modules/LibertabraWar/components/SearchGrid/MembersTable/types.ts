export interface MembersTableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  pageSize?: number
  memberList: MemberWarData[]
}

export type SortMode = {
  sortKey: 'deathCount' | 'level' | 'kills'
  desc: boolean
}
