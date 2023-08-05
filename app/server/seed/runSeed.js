const { seedMoves } = require('./seedMoves');
const mongoose = require('mongoose');

const connectionString = "mongodb://localhost:27017/gameDB"
  
mongoose.connect(connectionString);

// Call the seedMoves function to seed the database
seedMoves()
  .then(() => process.exit()) // Exit the script after seeding
  .catch((error) => {
    console.error('Error seeding the database:', error);
    process.exit(1); // Exit with an error code (non-zero)
  });