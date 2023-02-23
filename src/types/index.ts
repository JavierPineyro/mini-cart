export type State  = {
  category: string
  minPrice: number
}

export type SetState = React.Dispatch<React.SetStateAction<State>>