const Moves = require('../models/Moves');

const movesData = [
  {
    name: 'Move 1',
    description: 'Description for Move 1',
    uses: 10,
    damage: 50,
    accuracy: 80,
    modifier: 1,
    stat1boost: 0,
    stat2boost: 5,
    stat3boost: 0,
    stat4boost: 0,
    stat5boost: 0,
    stat6boost: 0,
  },
    {
    name: 'Move 2',
    description: 'Description for Move 2',
    uses: 10,
    damage: 50,
    accuracy: 80,
    modifier: 1,
    stat1boost: 5,
    stat2boost: 0,
    stat3boost: 0,
    stat4boost: 0,
    stat5boost: 0,
    stat6boost: 0,
    },
    {
    name: 'Move 3',
    description: 'Description for Move 3',
    uses: 10,
    damage: 50,
    accuracy: 80,
    modifier: 1,
    stat1boost: 0,
    stat2boost: 0,
    stat3boost: 0,
    stat4boost: 0,
    stat5boost: 0,
    stat6boost: 5,
    },
    {
    name: 'Move 4',
    description: 'Description for Move 4',
    uses: 10,
    damage: 50,
    accuracy: 80,
    modifier: 1,
    stat1boost: 0,
    stat2boost: 0,
    stat3boost: 5,
    stat4boost: 0,
    stat5boost: 0,
    stat6boost: 0,
    },
    {
    name: 'Move 5',
    description: 'Description for Move 5',
    uses: 10,
    damage: 50,
    accuracy: 80,
    modifier: 1,
    stat1boost: 0,
    stat2boost: 0,
    stat3boost: 0,
    stat4boost: 5,
    stat5boost: 0,
    stat6boost: 0,
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