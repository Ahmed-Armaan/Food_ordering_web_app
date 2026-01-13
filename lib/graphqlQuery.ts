{/* get list of all users -> id, name, country, role
  used for login page */}
export const getAllUserQuery = `
query Query {
  users {
    name
    id
    country
    role
  }
}
`

{/* get info of selected users -> country and role
  used for jwt Token generation */}
export const getUserInfo = `
query Query($userId: ID!) {
  user(id: $userId) {
    name
    id
    country
    role
  }
}
`

{/* get all of the resteraunts in a country -> id and name
  used to display data on UI */}
export const getAllResteraunts = `
query Query($country: String) {
  restaurants(country: $country) {
    id
    name
  }
}
`


{/* get menu of the selected resteraunts -> name and price 
  used to display data on UI */}
export const getMenu = `
query Query($restaurantId: ID!) {
  restaurant(id: $restaurantId) {
    menu {
      name
      price
    }
  }
}
`

export const getCard = `
query Query($all: Boolean) {
  cards(all: $all) {
    id
    brand
    last4
    expiryMonth
    expiryYear
    isDefault
  }
}
`
