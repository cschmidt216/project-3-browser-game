const Moves = require('../models/Moves');

const movesData = [
  {
    name: 'Strike',
    description: 'A simple attack with no special properties.',
    uses: 10,
    damage: 10,
    accuracy: 95,
    modifier: 0,
    healthboost: 1,
    strengthboost: 1,
    defenseboost: 1,
    speedboost: 1,
  },
    {
    name: 'Crippling Strike',
    description: 'A strike that lowers the opponent\'s strength.',
    uses: 10,
    damage: 5,
    accuracy: 80,
    modifier: 1,
    healthboost: 1,
    strengthboost: 1,
    defenseboost: 0,
    speedboost: 3,
    },
    {
    name: 'Blinding Speed',
    description: 'An attack that scales on both strength and speed',
    uses: 3,
    damage: 5,
    accuracy: 90,
    modifier: 2,
    healthboost: 0,
    strengthboost: 2,
    defenseboost: 0,
    speedboost: 2,
    },
    {
    name: 'Defensive Stance',
    description: 'Increases your defense',
    uses: 10,
    damage: 0,
    accuracy: 100,
    modifier: 3,
    healthboost: 4,
    strengthboost: 0,
    defenseboost: 5,
    speedboost: 0,
    },
    {
    name: 'Remedy',
    description: 'Restores your character\'s health',
    uses: 10,
    damage: 0,
    accuracy: 100,
    modifier: 4,
    healthboost: 10,
    strengthboost: 0,
    defenseboost: 1,
    speedboost: 0,
    },
    {
    name: 'Decisive Strike',
    description: 'A dangerous attack reducing your character\s stats, but deals massive damage.',
    uses: 1,
    damage: 30,
    accuracy: 75,
    modifier: 5,
    healthboost: 0,
    strengthboost: 0,
    defenseboost: 0,
    speedboost: 0,
    },
    {
    name: 'Agressive Stance',
    description: 'Increases your strength',
    uses: 10,
    damage: 0,
    accuracy: 100,
    modifier: 6,
    healthboost: 2,
    strengthboost: 5,
    defenseboost: 0,
    speedboost: 0,
    },
    {
    name: 'Block',
    description: 'Blocks the next attack',
    uses: 3,
    damage: 0,
    accuracy: 100,
    modifier: 7,
    healthboost: 5,
    strengthboost: 1,
    defenseboost: 2,
    speedboost: 0,
    },
];

async function seedMoves() {
    try {
      // Check if there are any documents in the "Moves" collection
      await Moves.countDocuments({}, { maxTimeMS: 60000 }); // Increase the timeout to 60 seconds (60000ms)
  
      // Remove all existing moves from the database
      await Moves.deleteMany({}, { maxTimeMS: 60000 }); // Increase the timeout to 60 seconds (60000ms)
  
      // Insert the moves data into the database
      const insertedMoves = await Moves.insertMany(movesData);
      console.log('Moves seeded successfully:', insertedMoves);
    } catch (error) {
      console.error('Error seeding moves:', error);
    }
  }
  
  module.exports = {
    movesData,
    seedMoves,
  };