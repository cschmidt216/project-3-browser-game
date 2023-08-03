const { seedMoves } = require('./seedMoves');
const mongoose = require('mongoose');

const connectionString = "mongodb+srv://cschmidt216:Nintendo-621@cluster0.zv0lzke.mongodb.net/gameDB?retryWrites=true&w=majority"
  
mongoose.connect(connectionString);

// Call the seedMoves function to seed the database
seedMoves()
  .then(() => process.exit()) // Exit the script after seeding
  .catch((error) => {
    console.error('Error seeding the database:', error);
    process.exit(1); // Exit with an error code (non-zero)
  });