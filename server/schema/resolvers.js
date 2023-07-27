const { Users, Characters, Moves } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {db, SECRET_KEY} = require('../config/connection.js');
const { signToken } = require('../utils/auth');
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
    }
  },
  //make a query to find all characters belonging to logged in user
  
  //make a query to find all moves belonging to a character

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
    }
  },
  //make a mutation to create a character
  //character has to be linked to logged in user and have 4 moves
  
};

module.exports = resolvers;