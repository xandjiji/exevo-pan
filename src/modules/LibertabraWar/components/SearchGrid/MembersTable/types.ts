export interface MembersTableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  pageSize?: number
  memberList: MemberWarData[]
}
