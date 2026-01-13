import { Cards } from "../mockDb"

export function getCards(all: boolean) {
  if (all) {
    return Cards
  }

  const card = Cards.find(card => card.isDefault)
  return card ? [card] : []
}
