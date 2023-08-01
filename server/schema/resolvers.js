const { Users, Characters, Moves } = require('../models');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {db, SECRET_KEY} = require('../config/connection.js');
const { signToken, authMiddleware } = require('../utils/auth');
const { validateRegisterInput, validateLoginInput } = require('../utils/validators');
const { UserInputError } = require('apollo-server-express');

const resolvers = {
  Query: {
    async getCharacterById(_, { characterId }) {
      try {
        const character = await Characters.findById(characterId);
        if (character) {
          return character;
        } else {
          throw new Error('Character not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    //make a query to find all characters belonging to logged in user
    async getAllCharacters(_, { userId }) {
      try {
        const characters = await Characters.find({ userId });
        if (characters) {
          return characters;
        } else {
          throw new Error('Character not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
   //make a query to find all moves belonging to a character
    async getAllMovesForCharacter(_, { characterId }) {
      try {
        const moves = await Moves.find({ characterId });
        if (moves) {
          return moves;
        } else {
          throw new Error('Moves not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getAllMoves(_, args, context) {
    try {
      const moves = await Moves.find();
      if (moves) {
        return moves;
      } else {
        throw new Error('Moves not found');
      }
    } catch (err) {
      throw new Error(err);
    }
  },
  },


  Mutation: {
    async createUser(_, { userInput: { username, password, email } }) {
      try {
        const { errors, valid } = validateRegisterInput(username, email, password);
        if (!valid) {
          throw new UserInputError('Errors', { errors });
        }
        // Check if the user already exists
        const user = await Users.findOne({ email });
        if (user) {
          throw new Error('User with that email already exists', {
            errors: { 
              email: 'User with that email already exists'
            }
          });
        }
        // Hash the password using bcrypt with 12 rounds of salt
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new Users({
          username,
          password: hashedPassword,
          email,
        });

        // Save the new user to the database
        const res = await newUser.save();

        // Create a JWT token with user information
        const token = signToken(
          {
            id: res._id,
            email: res.email,
            username: res.username,
          },
        );

        // Return the user data along with the token
        return {
          ...res._doc,
          id: res._id,
          token,
        };
      } catch (error) {
        // Handle any errors that occurred during user creation
        console.error('Error creating user:', error.message);
        throw new Error('Error creating user. Please try again later.');
      }
    },
    async loginUser(_, { loginInput: { email, password} }) {
      const { errors, valid } = validateLoginInput(email, password);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      const user = await Users.findOne({ email });
      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }
      const token = signToken(
        {
          id: user._id,
          email: user.email,
          username: user.username,
        },
      );
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async createCharacter(_, { characterInput: { name, moves, shape, style } }, context) {
      // check if user is authenticated
      if (!context.user) {
        throw new Error('Authentication failed. Please log in.');
      }
      console.log(context.user)
      // get user's id
      const userId = context.user._id;
      console.log({userId})
    
      const newCharacter = new Characters({
          name,
          moves,
          shape,
          style,
          userId: user._id,
          createdAt: new Date().toISOString(),
      });
    
      const character = await newCharacter.save();
      return character;
    },
  //make a mutation to delete a character
  async deleteCharacter(_, { characterId }, context) {
    const user = authMiddleware(context);
    try {
      const character = await Characters.findById(characterId);
      if (user._id === character.user) {
        await character.delete();
        return 'Character deleted successfully';
      } else {
        throw new Error('Action not allowed');
      }
    } catch (err) {
      throw new Error(err);
    }
  },
},

};

module.exports = resolvers;