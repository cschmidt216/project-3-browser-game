const { Schema, model } = require('mongoose');

const characterSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  name: { type: String, required: true },
  stat1: Number,
  stat2: Number,
  stat3: Number,
  stat4: Number,
  stat5: Number,
  stat6: Number,
  moves: [{ type: Schema.Types.ObjectId, ref: 'Moves' }]
});

module.exports = model('Characters', characterSchema);