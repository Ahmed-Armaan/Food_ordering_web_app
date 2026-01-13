import { getUsers } from "@/lib/db/getUsers"
import { getRestaurants } from "@/lib/db/getResteraunts"
import { getCards } from "@/lib/db/getCards"

export const resolvers = {
  Query: {
    users: () => {
      return getUsers({})
    },

    user: (_: any, args: { id: string }) => {
      return getUsers({ id: args.id })
    },

    restaurants: (_: any, args: { country: string }) => {
      return getRestaurants({
        country: args.country
      })
    },

    restaurant: (_: any, args: { id: string }) => {
      return getRestaurants({ id: args.id })
    },

    cards: (_: any, args: { all: boolean }) => {
      return getCards(args.all)
    },
  }
}
