const { Schema, model } = require('mongoose');

const moveSchema = new Schema({
  name: String,
  description: String,
  uses: Number,
  damage: Number,
  accuracy: Number,
  modifier: Number,
  stat1boost: Number,
  stat2boost: Number,
  stat3boost: Number,
  stat4boost: Number,
  stat5boost: Number,
  stat6boost: Number
});

module.exports = model('Moves', moveSchema);