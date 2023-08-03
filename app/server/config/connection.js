const mongoose = require('mongoose');

//const SECRET_KEY = 'superdupersecretyeah';


  
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://cschmidt216:Nintendo-621@cluster0.zv0lzke.mongodb.net/gameDB?retryWrites=true&w=majority", {
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


  