
export interface PagerProps extends React.HTMLAttributes<HTMLElement> {
  current: number
  total: number
}

export function Pager({ current, total, ...props }: PagerProps) {

  return (
   <h1>Pager</h1>
  )
}
