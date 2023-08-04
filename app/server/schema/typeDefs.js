const { gql } = require('apollo-server');

module.exports = gql`
type Users {
    _id: ID!
    username: String!
    password: String!
    email: String!
    token: String!
  }
  
  type Characters {
    _id: ID!
    user: ID!
    name: String!
    createdAt: String!
    shape: String!
    style: String!
    health: Float
    strength: Float
    defense: Float
    speed: Float
    moves: [Moves]!
  }
  
  type Moves {
    _id: ID!
    name: String!
    description: String!
    uses: Int!
    damage: Float!
    accuracy: Float!
    modifier: Float!
    healthboost: Float
    strengthboost: Float
    defenseboost: Float
    speedboost: Float
  }
  input UserInput {
    username: String!
    password: String!
    email: String!
  }
  input LoginInput {
    email: String
    password: String
  }
  input CharacterInput {
    _id: ID
    name: String!
    shape: String!
    style: String!
    moves: [ID]!
    user: ID!
  }
  type Query {
    getUser(userId: ID!): Users
    getCharacterById(characterId: ID!): Characters!
    getAllCharacters(userId: ID!): [Characters]!
    getAllMovesForCharacter(characterId: ID!): [Moves]!
    getAllMoves: [Moves]!
    findRandomOpponent(userId: ID!): Characters
  }
  
  type Mutation {
    createUser(userInput: UserInput): Users!
    loginUser(loginInput: LoginInput): Users!
    createCharacter(characterInput: CharacterInput): Characters!
    deleteCharacter(characterId: ID!): Characters!
  }

`;