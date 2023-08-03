const mongoose = require('mongoose');

//const SECRET_KEY = 'superdupersecretyeah';


  
mongoose.connect(process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/gameDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: ' gameDB'
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB database!');
});

module.exports = db //SECRET_KEY;