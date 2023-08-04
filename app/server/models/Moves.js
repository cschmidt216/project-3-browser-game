const { Schema, model } = require('mongoose');

const moveSchema = new Schema({
  name: String,
  description: String,
  uses: Number,
  damage: Number,
  accuracy: Number,
  modifier: Number,
  healthboost: Number,
  strengthboost: Number,
  defenseboost: Number,
  speedboost: Number,
});

module.exports = model('Moves', moveSchema);