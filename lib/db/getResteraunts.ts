import { resteraunts } from "../mockDb"

export type GetRestaurantProps = {
  id?: string
  country?: string
}

export function getRestaurants(props: GetRestaurantProps) {
  const { id, country } = props

  if (id) {
    const intId = parseInt(id, 10)
    return restaById(intId)
  }

  if (country) {
    return restaByCountry(country)
  }

  return resteraunts
}

function restaById(id: number) {
  return resteraunts.find(r => r.id === id) ?? null
}

function restaByCountry(country: string) {
  return resteraunts.filter(r => r.country === country)
}
