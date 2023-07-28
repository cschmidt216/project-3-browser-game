const { Schema, model } = require('mongoose');

function movesLimitValidator(val) {
  return val.length <= 4;
}

const characterSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  shape: { type: String, required: true },
  style: { type: String, required: true },
  stat1: Number,
  stat2: Number,
  stat3: Number,
  stat4: Number,
  stat5: Number,
  stat6: Number,
  moves: [{ type: Schema.Types.ObjectId, ref: 'Moves' , validate: [movesLimitValidator, 'You can only have 4 moves!'] }]
});

module.exports = model('Characters', characterSchema);