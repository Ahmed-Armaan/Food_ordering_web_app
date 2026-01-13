import { users } from "../mockDb"

export type GetUserProps = {
  id?: string
}

export function getUsers(props: GetUserProps) {
  const { id } = props

  if (id) {
    const intId = parseInt(id, 10)
    return userById(intId)
  }

  return users
}

function userById(id: number) {
  return users.find(u => u.id === id) ?? null
}
