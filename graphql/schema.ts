export const typeDefs = `
  type User {
    id: ID!
    name: String!
    role: String!
    country: String!
  }
  
  type MenuItem {
    name: String!
    price: Int!
  }
  
  type Restaurant {
    id: ID!
    name: String!
    country: String!
    menu: [MenuItem!]!
  }

  type Card{
    id: ID!
    type: String!
    brand: String!
    last4: String!
    expiryMonth: Int!
    expiryYear: Int!
    isDefault: Boolean!
  }
  
  type Query {
    users: [User!]!
    user(id: ID!): User
    restaurants(country: String): [Restaurant!]!
    restaurant(id: ID!): Restaurant
    cards: [Card!]!
  }
`;
