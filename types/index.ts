export type AuthForn = {
  email: string
  password: string
}

export type EditedTask = {
  id: number
  title: string
  description?: string | null
}
