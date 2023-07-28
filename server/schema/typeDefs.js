const { gql } = require('apollo-server');

module.exports = gql`
type Users {
    _id: ID!
    username: String!
    password: String!
    email: String!
    token: String!
    character: Characters
  }
  
  type Characters {
    _id: ID!
    user: Users!
    name: String!
    createdAt: String!
    shape: String!
    style: String!
    stat1: Float
    stat2: Float
    stat3: Float
    stat4: Float
    stat5: Float
    stat6: Float
    moves: [Moves]!
  }
  
  type Moves {
    _id: ID!
    name: String!
    uses: Int!
    damage: Float!
    accuracy: Float!
    modifier: Float!
    stat1boost: Float
    stat2boost: Float
    stat3boost: Float
    stat4boost: Float
    stat5boost: Float
    stat6boost: Float
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
    name: String!
    shape: String!
    style: String!
    moves: [ID]
  }
  type Query {
    getUser(userId: ID!): Users
    getCharacterById(characterId: ID!): Characters!
    getAllCharacters(userId: ID!): [Characters]!
    getAllMoves(characterId: ID!): [Moves]!
  }
  
  type Mutation {
    createUser(userInput: UserInput): Users!
    loginUser(loginInput: LoginInput): Users!
    createCharacter(characterInput: CharacterInput): Characters!
    deleteCharacter(characterId: ID!): Characters!
  }

`;